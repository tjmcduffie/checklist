import CreateItemFormUI from './CreateItemFormUI';
import React, { Component } from 'react';

class CreateItemFormClass extends Component {
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
    });
    this._resetValue();
  }

  _resetValue = () => this.setState({value: ''});

  render() {
    return (
      <CreateItemFormUI
        onChange={this._onChange}
        onSubmit={this._onSubmit}
        value={this.state.value}
      />
    );
  }
};

export default CreateItemFormClass;
