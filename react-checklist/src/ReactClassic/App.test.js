import App from './App';
import * as db from '../shared/util/LocalDataAPI';
import React from 'react';
import ReactDOM from 'react-dom';

jest.mock('../shared/util/LocalDataAPI');

it('App renders without crashing', () => {
  db.findAll.mockResolvedValue([]);
  db.findMetadata.mockResolvedValue(true);
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
