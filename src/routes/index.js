/* eslint-disable max-len */
import { Route } from 'react-router-dom';
import React, { Fragment } from 'react';
import routes from './route';

const router = (
  <Fragment>
    {routes.map((route, i) => <Route key={i} path={route.path} component={route.component} exact={true}/>)}
  </Fragment>
);

export default router;
