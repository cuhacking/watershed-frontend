import React, {useState, useEffect, useContext, createContext} from 'react';
import Cookies from 'js-cookie';

interface UserObject {
  uuid: string;
  email: string;
  role: number;
  githubId: string | null;
  discordId: string | null;
}

interface AccessTokenObject {
  token: string;
  expiryDate: Date;
}

type AuthResponse = 'ok' | 'expected-failure' | 'error';

type AuthObject = {
  accessToken: AccessTokenObject | null;
  isInitiallyLoading: boolean;
  user: UserObject | null;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  request: (
    input: RequestInfo,
    init?: RequestInit | undefined
  ) => Promise<Response>;
  signOut: () => void;
};

const useProvideAuth = (): AuthObject => {
  const [isInitiallyLoading, setLoading] = useState(true);
  const [accessToken, setToken] = useState<AccessTokenObject | null>(null);
  const [user, setUser] = useState<UserObject | null>(null);

  const getUserInfoHelper = async (token: string): Promise<AuthResponse> => {
    const userResponse = await fetch('/api/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    switch (userResponse.status) {
      case 200:
        const _userInfo = await userResponse.json();

        setUser({
          uuid: _userInfo.uuid,
          email: _userInfo.email,
          role: _userInfo.role,
          githubId: _userInfo.githubId,
          discordId: _userInfo.discordId,
        });
        return 'ok';
      case 401:
        return 'expected-failure';
      default:
        return 'error';
    }
  };

  const resetHelper = () => {
    Cookies.remove('refreshToken');
    setToken(null);
    setUser(null);
  };

  const getAccessTokenHelper = async (
    token: string
  ): Promise<AccessTokenObject | null> => {
    try {
      const accessTokenResponse = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
        }),
      });

      if (accessTokenResponse.status !== 200) {
        resetHelper();
        setLoading(false);
        return null;
      }

      const {accessToken: _accessToken} = await accessTokenResponse.json();
      const newToken = {
        token: _accessToken.token,
        expiryDate: new Date(_accessToken.expiryDate),
      };

      setToken(newToken);

      const result = await getUserInfoHelper(newToken.token);

      if (result === 'expected-failure') {
        resetHelper();
        setLoading(false);
        return null;
      }
      setLoading(false);
      return newToken;
    } catch (error) {
      resetHelper();
      console.error('Unexpected error retrieving access token: ', error);
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    const refreshToken = Cookies.get('refreshToken');

    if (!refreshToken) {
      setLoading(false);
      return;
    }

    getAccessTokenHelper(refreshToken);
  }, []);

  const signIn = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      const tokenResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      switch (tokenResponse.status) {
        case 200:
          break;
        case 401:
          return 'expected-failure';
        default:
          throw tokenResponse;
      }

      const _tokens = await tokenResponse.json();

      Cookies.set('refreshToken', _tokens.refreshToken.token, {secure: true});
      setToken({
        token: _tokens.accessToken.token,
        expiryDate: new Date(_tokens.accessToken.expiryDate),
      });

      return await getUserInfoHelper(_tokens.accessToken.token);
    } catch (error) {
      console.error('Unexpected error on sign in: ', error);
      return 'error';
    }
  };

  const signUp = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      const tokenResponse = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      switch (tokenResponse.status) {
        case 201:
          break;
        case 400:
          return 'expected-failure';
        default:
          throw tokenResponse;
      }

      const _tokens = await tokenResponse.json();

      Cookies.set('refreshToken', _tokens.refreshToken.token, {secure: true});
      setToken({
        token: _tokens.accessToken.token,
        expiryDate: new Date(_tokens.accessToken.expiryDate),
      });

      return await getUserInfoHelper(_tokens.accessToken.token);
    } catch (error) {
      console.error('Unexpected error on sign up: ', error);
      return 'error';
    }
  };

  const request = async (
    input: RequestInfo,
    init?: RequestInit | undefined
  ): Promise<Response> => {
    // Returns a valid access token by refreshing the token if it's expired
    // Throws if the refresh token is invalid somehow
    const getCorrectToken = async () => {
      if (accessToken && new Date() > accessToken?.expiryDate) {
        const refreshToken = Cookies.get('refreshToken');

        if (!refreshToken) {
          resetHelper();
          throw new Error('invalid-refresh-token');
        }

        const newAccessToken = await getAccessTokenHelper(refreshToken);
        if (newAccessToken === null) {
          resetHelper();
          throw new Error('invalid-refresh-token');
        }

        return newAccessToken;
      }

      // This should never happen, if you're getting this error
      // you're trying to make a request without having logged in first.
      if (accessToken === null) throw new Error('no-access-token');

      return accessToken;
    };

    const token = await getCorrectToken();

    const options = {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Bearer ${token?.token}`,
      },
    };

    return fetch(input, options);
  };

  const signOut = async () => {
    try {
      await request('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: Cookies.get('refreshToken'),
        }),
      });
    } catch (error) {
      console.error('Unexpected error on log out: ', error);
    }

    resetHelper();
  };

  return {
    accessToken,
    isInitiallyLoading,
    user,
    signIn,
    signUp,
    request,
    signOut,
  };
};

const AuthContext = createContext<Partial<AuthObject>>({});

export const ProvideAuth = (props: {children: React.ReactNode}) => {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthObject;
