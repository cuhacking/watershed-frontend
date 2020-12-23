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

  const getAccessTokenHelper = async (token: string): Promise<boolean> => {
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
        return false;
      }

      const {accessToken: _accessToken} = await accessTokenResponse.json();

      setToken({
        token: _accessToken.token,
        expiryDate: new Date(_accessToken.expiryDate),
      });

      const result = await getUserInfoHelper(_accessToken.token);

      if (result === 'expected-failure') {
        resetHelper();
        setLoading(false);
        return false;
      }
      setLoading(false);
      return true;
    } catch (error) {
      resetHelper();
      console.error('Unexpected error retrieving access token: ', error);
      setLoading(false);
      return false;
    }
  };

  const verifyNotExpiredHelper = async (): Promise<boolean> => {
    if (accessToken && new Date() > accessToken?.expiryDate) {
      const refreshToken = Cookies.get('refreshToken');

      if (!refreshToken) return false;

      return await getAccessTokenHelper(refreshToken);
    }

    return true;
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
          return 'error';
      }

      const _tokens = await tokenResponse.json();

      Cookies.set('refreshToken', _tokens.refreshToken.token);
      setToken({
        token: _tokens.refreshToken.token,
        expiryDate: new Date(_tokens.refreshToken.expiryDate),
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
        case 200:
          break;
        case 400:
          return 'expected-failure';
        default:
          return 'error';
      }

      const _tokens = await tokenResponse.json();

      Cookies.set('refreshToken', _tokens.refreshToken.token);
      setToken({
        token: _tokens.refreshToken.token,
        expiryDate: new Date(_tokens.refreshToken.expiryDate),
      });

      return await getUserInfoHelper(_tokens.accessToken.token);
    } catch (error) {
      console.error('Unexpected error on sign up: ', error);
      return 'error';
    }
  };

  const signOut = async () => {
    if (!verifyNotExpiredHelper()) return;

    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken?.token}`,
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
