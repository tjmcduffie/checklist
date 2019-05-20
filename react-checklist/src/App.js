import ChecklistCreateItemForm from './create-item-form/CreateItemFormClass';
import ChecklistItems from './checklist/ItemsUI';
import classnames from 'classnames';
import * as db from './util/LocalDataAPI';
import React, { Component } from 'react';


import './App.css';
import './util/Button.css';
import './util/Flex.css';

class App extends Component {
  state = {
    errors: [],
    items: [],
    shouldShowCompleted: true,
  };

  componentDidMount() {
    db.findAll().then(items => this.setState({items}));
    db.findMetadata('shouldShowCompleted')
      .then(shouldShow => {
        this.setState({shouldShowCompleted: shouldShow != null ? shouldShow : true})
        if (shouldShow == null) {
          db.putMetadata('shouldShowCompleted', true);
        }
      })
      // if the get fails, its because we haven't set the value.
      .catch(this._onPromiseRejection);
  }

  _onCreate = (item) => {
    db.create(item)
      .then(uuid => db.findByUuid(uuid))
      .then(dbItem => this.setState(
        ({items: prevItems}) => ({items: prevItems.concat(dbItem)})
      ))
      .catch(this._onPromiseRejection);
  }

  _onPromiseRejection = e => this.setState(
    ({prevErrors}) => ({errors: prevErrors.concat(e.message)})
  );

  _onToggleIsComplete = (uuid, prevIsChecked) => {
    db.update(uuid, {isComplete: !prevIsChecked})
      .then(updated => {
        if (updated === 0) {
          throw new Error(`${uuid} could not be updated as it could not be found`);
        }
        return db.findByUuid(uuid);
      })
      .then(dbItem => this.setState(
        // use map to create a new array instead of mutating the array via slice
        ({items: prevItems}) => ({items: prevItems.map(item => item.uuid !== uuid ? item : dbItem)})
      ))
      .catch(this._onPromiseRejection);
  }

  _onRemoveItem = uuid => {
    db.remove(uuid)
      .then(this.setState(
        ({items: prevItems}) => ({items: prevItems.filter(item => item.uuid !== uuid)})
      ))
      .catch(this._onPromiseRejection);
  }

  _onToggleCompleted = () => {
    const nextShouldShowCompleted = !this.state.shouldShowCompleted;
    db.putMetadata('shouldShowCompleted', nextShouldShowCompleted)
      .then(() => this.setState(prevState => ({shouldShowCompleted: nextShouldShowCompleted})));
  };

  render() {
    const {items, shouldShowCompleted} = this.state;
    return (
      <div className="app">
        <header className={classnames('flex-row')}>
          <h1 className={classnames('flex-grow')}>Checklist</h1>
          <button
            className={classnames('clear-button', 'monospaced-button', 'flex-shrink', 'flex-align-center')}
            onClick={this._onToggleCompleted}
            onKeyPress={
              e => ((e.key === " " || e.key === "Enter") && this._onToggleCompleted())
            }>
            {shouldShowCompleted ? 'Hide completed' : 'Show completed'}
          </button>
        </header>
        <main>
          <ChecklistItems
            items={items}
            onToggleIsComplete={this._onToggleIsComplete}
            onRemoveItem={this._onRemoveItem}
            shouldShowCompleted={shouldShowCompleted}
          />
          <ChecklistCreateItemForm onCreate={this._onCreate} />
        </main>
      </div>
    );
  }
}

export default App;
