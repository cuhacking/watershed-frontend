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

type AuthObject = {
  isInitiallyLoading: boolean;
  user: UserObject | null;
  signIn: (email: string, password: string) => Promise<boolean | Error>;
  signUp: (email: string, password: string) => Promise<boolean | Error>;
  signOut: () => void;
};

const useProvideAuth = (): AuthObject => {
  const [isInitiallyLoading, setLoading] = useState(false);
  const [accessToken, setToken] = useState<AccessTokenObject | null>(null);
  const [user, setUser] = useState<UserObject | null>(null);

  // Helper methods
  const getUserInfoHelper = async (token: string) => {
    //TODO: should I do a try/catch here?
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
        return true;
      case 401:
        return false; // TODO: sign in again
      default:
        return false; // TODO: return a better error
    }
  };

  useEffect(() => {
    setLoading(true);

    const refreshToken = Cookies.get('refreshToken');

    if (!refreshToken) {
      setLoading(false);
      return;
    }

    const getAccessToken = async () => {
      try {
        const accessTokenResponse = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: refreshToken,
          }),
        });

        switch (accessTokenResponse.status) {
          case 200:
            break;
          case 401:
            setLoading(false);
            Cookies.remove('refreshToken');
            return false;
          default:
            setLoading(false);
            return false; //TODO: somehow let upstack know that this is different than a 401
        }

        const {accessToken: _accessToken} = await accessTokenResponse.json();

        setToken({
          token: _accessToken.token,
          expiryDate: new Date(_accessToken.expiryDate),
        });

        return await getUserInfoHelper(_accessToken.token);
      } catch (error) {
        console.log('Uh oh!');
        console.error(error);
        // return new Error('unexpected-error');
      }
    };

    getAccessToken();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      //TODO: use env variables
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
          return false; // TODO: incorrect email/password
        default:
          return false; // TODO: return a better error
      }

      const _tokens = await tokenResponse.json();

      Cookies.set('refreshToken', _tokens.refreshToken.token);
      setToken({
        token: _tokens.refreshToken.token,
        expiryDate: new Date(_tokens.refreshToken.expiryDate),
      });

      return await getUserInfoHelper(_tokens.accessToken.token);
    } catch (error) {
      console.error(error);
      return new Error('unexpected-error');
    }
  };

  const signUp = async (email: string, password: string) => {
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
          return false; //TODO: Email already taken
        default:
          return false; // TODO: Something went wrong
      }

      const _tokens = await tokenResponse.json();

      Cookies.set('refreshToken', _tokens.refreshToken.token);
      setToken({
        token: _tokens.refreshToken.token,
        expiryDate: new Date(_tokens.refreshToken.expiryDate),
      });

      return await getUserInfoHelper(_tokens.accessToken.token);
    } catch (error) {
      console.error(error);
      return new Error('unexpected-error');
    }
  };

  const signOut = async () => {
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
      console.error(error);
      // return new Error('unexpected-error');
    }

    Cookies.remove('refreshToken');
    setToken(null);
    setUser(null);
  };

  return {
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
