import ChecklistCreateItemForm from './create-item-form/CreateItemForm';
import ChecklistItems from './checklist/Items';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    items: [],
  };

  _onCreate = (item) => {
    this.setState(({items}) => {
      return {items: items.concat(item)};
    })
  }

  _onToggleIsComplete = (uuid, prevIsChecked) => {
    const toggledCheck = {isComplete: !prevIsChecked};
    this.setState(({items}) => ({
      items: items.map(
        item => (item.uuid !== uuid ? item : Object.assign(item, toggledCheck))
      ),
    }));
  }

  _onRemoveItem = uuid => {
    this.setState(({items}) => ({items: items.filter(item => item.uuid !== uuid)}));
  }

  render() {
    return (
      <div className="app">
        <header>
          <h1>Checklist</h1>
        </header>
        <main>
          <ChecklistItems
            items={this.state.items}
            onToggleIsComplete={this._onToggleIsComplete}
            onRemoveItem={this._onRemoveItem}
          />
          <ChecklistCreateItemForm onCreate={this._onCreate} />
        </main>
      </div>
    );
  }
}

export default App;
