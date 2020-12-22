import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {
  Redirect,
  Route,
  RouteProps,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import styled from 'styled-components';
import {ProvideAuth, useAuth} from '../../hooks';
import {LoadingSymbol} from '../../components';
import Login from './login';
import SignUp from './signUp';
import Home from './home';

const LoadingWindow = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export default () => {
  const {path, url} = useRouteMatch();

  return (
    <>
      <Helmet titleTemplate={`%s — cuHacking 2021 Dashboard`} />
      <ProvideAuth>
        <Switch>
          <PrivateRoute path={`${path}/`} exact>
            <Home />
          </PrivateRoute>
          <UnprivateRoute path={`${path}/login`}>
            <Login />
          </UnprivateRoute>
          <UnprivateRoute path={`${path}/sign-up`}>
            <SignUp />
          </UnprivateRoute>
        </Switch>
      </ProvideAuth>
    </>
  );
};

const PrivateRoute = ({children, ...rest}: RouteProps) => {
  const {isInitiallyLoading, user} = useAuth();

  if (isInitiallyLoading) {
    return (
      <LoadingWindow>
        <LoadingSymbol />
      </LoadingWindow>
    );
  }

  return (
    <Route
      {...rest}
      render={({location}: any) => {
        if (user === null) {
          return (
            <Redirect
              to={{
                pathname: '/dashboard/login',
                state: {from: location},
              }}
            />
          );
        }

        return children;
      }}
    />
  );
};

const UnprivateRoute = ({children, ...rest}: RouteProps) => {
  const {isInitiallyLoading, user} = useAuth();

  if (isInitiallyLoading) {
    return (
      <LoadingWindow>
        <LoadingSymbol />
      </LoadingWindow>
    );
  }

  return (
    <Route
      {...rest}
      render={() => {
        if (user !== null) {
          return (
            <Redirect
              to={{
                pathname: '/dashboard',
              }}
            />
          );
        }

        return children;
      }}
    />
  );
};
