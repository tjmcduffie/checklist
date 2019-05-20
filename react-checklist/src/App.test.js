import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as db from './util/LocalDataAPI';

jest.mock('./util/LocalDataAPI');

it('App renders without crashing', () => {
  db.findAll.mockResolvedValue([]);
  db.findMetadata.mockResolvedValue(true);
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
