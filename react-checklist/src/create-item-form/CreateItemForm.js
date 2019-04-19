import classnames from 'classnames';
import CreateItemButton from './CreateItemButton';
import CreateItemInput from './CreateItemInput';
import React, { Component } from 'react';
import uuid from '../util/uuid';
import '../util/Flex.css';
import '../util/Spacing.css';

class CreateItemForm extends Component {
  state = {
    value: '',
  }

  _onChange = (e) => {
    this.setState({value: e.target.value});
  }

  _onSubmit = (e) => {
    e.preventDefault();
    const value = this.state.value.trim();
    if (value === '') {
      return;
    }
    this.props.onCreate({
      description: value,
      isComplete: false,
      uuid: uuid(),
    });
    this._resetValue();
  }

  _resetValue = () => this.setState({value: ''});

  render() {
    return (
      <form
        className={classnames('flex-row')}
        onSubmit={this._onSubmit}>
        <CreateItemInput
          className={classnames('flex-grow', 'space-after-regular')}
          onChange={this._onChange}
          value={this.state.value}
        />
        <CreateItemButton className="flex-shrink" />
      </form>
    );
  }
};

export default CreateItemForm;
