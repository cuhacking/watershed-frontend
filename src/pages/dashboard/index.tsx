import React from 'react';
import {Helmet} from 'react-helmet';
import {
  Redirect,
  Route,
  RouteProps,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import styled from 'styled-components';
import {ProvideApplication, useAuth, useApplication} from '../../hooks';
import {LoadingSymbol} from '../../components';
import Login from './login';
import SignUp from './signUp';
import Home from './home';
import Registration from './registration';

const LoadingWindow = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export default () => {
  const {path} = useRouteMatch();

  return (
    <>
      <Helmet titleTemplate={`%s — cuHacking 2021 Dashboard`} />
      <ProvideApplication>
        <Switch>
          <PrivateRoute path={`${path}/`} exact>
            <Home />
          </PrivateRoute>
          <RegistrationRoute path={`${path}/registration`} exact>
            <Registration />
          </RegistrationRoute>
          <UnprivateRoute path={`${path}/login`}>
            <Login />
          </UnprivateRoute>
          <UnprivateRoute path={`${path}/sign-up`}>
            <SignUp />
          </UnprivateRoute>
          <Redirect to={`${path}/`} />
        </Switch>
      </ProvideApplication>
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

const RegistrationRoute = ({children, ...rest}: RouteProps) => {
  const {isInitiallyLoading, user} = useAuth();
  const {isLoading, application} = useApplication();

  if (isInitiallyLoading || isLoading) {
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
                pathname: '/dashboard/sign-up',
                state: {from: location},
              }}
            />
          );
        }

        if (application !== null) {
          return (
            <Redirect
              to={{
                pathname: '/dashboard',
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
