import React from 'react';
import {Helmet} from 'react-helmet';
import {Route, Switch, useRouteMatch} from 'react-router-dom';

import Login from './login';

export default () => {
  const {path, url} = useRouteMatch();

  return (
    <>
      <Helmet titleTemplate={`%s — cuHacking 2021 Dashboard`} />
      <Switch>
        <Route path={`${path}/login`} component={Login} />
      </Switch>
    </>
  );
};
