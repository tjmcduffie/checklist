import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Deferred from '../base/Deferred';
import Nav from './Nav';
import routesConfig from '../../routesConfig';

const Router = () => (
  <BrowserRouter>
    <Nav />
    <Switch>
      <Route path="/" exact render={props => (<div>index</div>)} />
      {routesConfig.map(route => (
        <Route
          exact
          key={route.id}
          path={route.browserPath}
          render={
            props => (<Deferred importFn={route.importFn} id={route.id} />)
          }
        />
      ))}
    </Switch>
  </BrowserRouter>
);

export default Router;
