import Loading from 'components/loading';
import React, { useEffect, useReducer, useState } from 'react';
import { useLiff } from 'react-liff';
import { IAuthState } from 'types/auth';
import axios from 'utils/axios';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

type IChildren = { children: React.ReactNode };
type IToken = { token: string };

const initialState: IAuthState = {
  name: '',
  image: '',
};

const AuthProvider: React.FC<IChildren> = ({ children }) => {
  const [token, setToken] = useState('');
  const [loadingToken, setLoadingToken] = useState(true);
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const { error, isLoggedIn, isReady, liff } = useLiff();

  useEffect(() => {
    if (!isLoggedIn) return;

    (async () => {
      // Get TokenId
      const tokenId = liff.getIDToken();
      if (!tokenId) return;

      // Login
      const response = await login(tokenId);
      if (!response) return;

      const { token } = response;
      setToken(token);

      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      setLoadingToken(false);
    })();
  }, [liff, isLoggedIn]);

  const login = async (userId: string) => {
    try {
      const response = await axios.post<IToken>('/auth', {
        userId,
      });

      return response.data;
    } catch (error) {
      alert(error);
      return null;
    }
  };

  if (!isReady || loadingToken)
    return (
      <>
        <Loading />
      </>
    );

  return <AuthContext.Provider value={{ ...authState }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
