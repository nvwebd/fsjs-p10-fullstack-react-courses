import React, { createContext, useContext, useState } from 'react';
import { apiClient } from '../utils/apiClient';

const sessionStorageKey = '__authenticated_user__';

const getAuthUser = async () => {
  return window.sessionStorage.getItem(sessionStorageKey);
};

const setAuthUser = async (user) => {
  window.sessionStorage.setItem(sessionStorageKey, user);
};

const AuthContext = createContext({
  authenticatedUser: getAuthUser(),
  getAuthUser: getAuthUser,
  signIn: undefined,
  signOut: undefined,
});

const AuthProvider = (props) => {
  const [authenticatedUser, setAuthenticatedUser] = useState();

  const signIn = async (user) => {
    const authenticatedUserInSessionStorage = await getAuthUser();

    if (authenticatedUserInSessionStorage) {
      setAuthenticatedUser(JSON.parse(authenticatedUserInSessionStorage));
    } else {
      const authHeader = btoa(`${user.emailAddress}:${user.password}`);
      // joe@smith.com
      // joepassword

      apiClient('users', {
        headers: {
          Authorization: `Basic ${authHeader}`,
        },
      })
        .then(async (userResponse) => {
          await setAuthUser(JSON.stringify(userResponse));
          setAuthenticatedUser(userResponse);
        })
        .catch((error) => {
          console.log('Error Sign In: ', error);
        });
    }
  };

  const signOut = () => {
    setAuthenticatedUser(undefined);
  };

  const value = {
    authenticatedUser,
    signIn,
    signOut,
    getAuthUser,
  };

  // eslint-disable-next-line react/prop-types
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used withing a AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuthContext };
