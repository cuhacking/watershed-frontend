import React, {useState, useEffect, useContext, createContext} from 'react';
import Cookies from 'js-cookie';

interface UserObject {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: number;
  githubId: string;
  discordId: string;
}

interface TokensObject {
  accessToken: string;
  refreshToken: string;
  expiryDate: Date;
}

type AuthObject = {
  tokens: TokensObject;
  user: UserObject | null;
  signIn: (email: string, password: string) => Promise<boolean | Error>;
};

const useProvideAuth = () => {
  const [isLoading, setLoading] = useState(false);
  const [tokens, setTokens] = useState<TokensObject | null>(null);
  const [user, setUser] = useState<UserObject | null>(null);

  // useEffect(() => {
  //   setLoading(true)

  //   const refreshToken = Cookies.get('refreshToken')

  //   if (!refreshToken) {
  //     setLoading(false)
  //     return;
  //   }

  //   const getAccessToken = async () => {
  //     try {
  //       const response = await fetch('https://dev.cuhacking.com/api/auth/refresh', {
  //         method: 'POST',
  //         mode:'cors',
  //         body: JSON.stringify({
  //           refreshToken
  //         })
  //       })

  //       switch (response.status) {
  //         case 401:
  //           setLoading(false)
  //           return; //TODO: something better, I think?
  //         case 200:

  //         default:
  //       }

  //       if (response.status === 401) {
  //       }

  //     }
  //   }

  // }, [])

  const signIn = async (email: string, password: string) => {
    try {
      //TODO: use env variables
      const tokenResponse = await fetch(
        'https://dev.cuhacking.com/api/auth/login',
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      switch (tokenResponse.status) {
        case 200:
          break;
        case 401:
          return false;
        default:
          return false; // TODO: return a better error
      }

      const _tokens = await tokenResponse.json();

      const userResponse = await fetch(
        'https://dev.cuhacking.com/api/user/me',
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${_tokens.accessToken.token}`,
          },
        }
      );

      switch (userResponse.status) {
        case 200:
          Cookies.set('refreshToken', _tokens.refreshToken.token);

          setTokens({
            accessToken: _tokens.accessToken.token,
            refreshToken: _tokens.refreshToken.token,
            expiryDate: new Date(_tokens.accessToken.expiryDate),
          });

          const _userInfo = await userResponse.json();
          setUser({
            ..._userInfo,
          });
          return true;
        case 401:
          return false;
        default:
          return false; // TODO: return a better error
      }
    } catch (error) {
      console.error(error);
      return new Error('unexpected-error');
    }
  };

  return {
    user,
    signIn,
  };
};

const AuthContext = createContext<Partial<AuthObject>>({});

export const ProvideAuth = (props: {children: React.ReactNode}) => {
  const auth = useProvideAuth() as AuthObject;

  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthObject;
