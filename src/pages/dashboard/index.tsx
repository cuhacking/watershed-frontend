import React from 'react';
import {
  Link,
  Redirect,
  Route,
  RouteProps,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import styled, {createGlobalStyle} from 'styled-components';
import {ProvideApplication, useAuth, useApplication} from '../../hooks';
import {Button, LoadingSymbol} from '../../components';
import Login from './login';
import SignUp from './signUp';
import Home from './home';
import Registration from './registration';
import ForgotPassword from './forgotPassword';
import ResetPassword from './resetPassword';
import Schedule from './schedule';
import Event from './event';
import {ReactComponent as Logo} from 'assets/img/word-and-year-logo-white.svg';
import CheckIn from './checkin';
import Submissions from './submissions';

const DashboardStyle = createGlobalStyle`
  body {
    --card-shadow: 0px 0px 4px #13010140;
  }

  h1, h2, h3, h4 {
    font-family: var(--primary-font);
    font-weight: 400
  }

  h1 {
    font-size: 2.25rem;
  }

  h2 {
    font-size: 1.625rem;
  }

  h4 {
    font-size: 1.125rem;
  }
`;

const LoadingWindow = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const StyledLogo = styled(Logo)`
  width: 300px;
  height: 50px;
`;

const LogoLink = styled(Link)`
  margin-bottom: 50px;
`;

const CustomLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 100vw;
  min-height: 100vh;
`;

const CustomLayoutContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;

  @media only screen and (min-width: 700px) {
    max-width: var(--content-width);
  }
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;

export default () => {
  const {path} = useRouteMatch();

  return (
    <>
      <DashboardStyle />
      <ProvideApplication>
        <Switch>
          <PrivateRoute path={`${path}/`} exact>
            <Home />
          </PrivateRoute>
          <PrivateRoute path={`${path}/schedule`} exact>
            <Schedule />
          </PrivateRoute>
          <PrivateRoute path={`${path}/checkin`}>
            <CheckIn />
          </PrivateRoute>
          <PrivateRoute path={`${path}/submissions`} exact>
            <Submissions />
          </PrivateRoute>
          <PrivateRoute path={`${path}/schedule/:id`} exact>
            <Event />
          </PrivateRoute>
          <RegistrationRoute path={`${path}/registration`} exact>
            <Registration />
          </RegistrationRoute>
          <UnprivateRoute path={`${path}/forgot`}>
            <ForgotPassword />
          </UnprivateRoute>
          <UnprivateRoute path={`${path}/reset`}>
            <ResetPassword />
          </UnprivateRoute>
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
  const history = useHistory();
  const {isInitiallyLoading: isAuthLoading, user, signOut} = useAuth();
  const {isLoading: isApplicationLoading, application} = useApplication();

  const handleSignOut = async () => {
    await signOut();
    history.push('/');
  };

  return (
    <Route
      {...rest}
      render={({location}: any) => {
        if (isAuthLoading) {
          return (
            <CustomLayout>
              <LoadingSymbol />
            </CustomLayout>
          );
        }

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

        if (isApplicationLoading) {
          return (
            <CustomLayout>
              <LoadingSymbol />
            </CustomLayout>
          );
        }

        if (application === null) {
          return (
            <CustomLayout>
              <CustomLayoutContent>
                <LogoLink to='/'>
                  <StyledLogo />
                </LogoLink>
                <h1>Registrations closed.</h1>
                <p>
                  Sorry, registrations closed on January 27, 23:59 EST.
                  <br />
                  <br />
                  Follow us on our socials so you don't miss out on our future
                  events!
                </p>
                <StyledButton
                  kind='button'
                  color='var(--wineLight)'
                  action={handleSignOut}
                >
                  Sign Out
                </StyledButton>
              </CustomLayoutContent>
            </CustomLayout>
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
