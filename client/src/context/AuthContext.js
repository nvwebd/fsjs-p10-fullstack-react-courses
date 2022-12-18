import React, { createContext, useContext, useState } from 'react';
import { apiClient } from '../utils/apiClient';

const AuthContext = createContext(undefined);

const AuthProvider = (props) => {
  const [authenticatedUser, setAuthenticatedUser] = useState();

  const signIn = (user) => {
    const authHeader = btoa(`${user.emailAddress}:${user.password}`);
    // joe@smith.com
    // joepassword

    apiClient('users', {
      headers: {
        Authorization: `Basic ${authHeader}`,
      },
    })
      .then((userResponse) => {
        setAuthenticatedUser(userResponse);
      })
      .catch((error) => {
        console.log('Error Sign In: ', error);
      });
  };

  const signOut = () => {
    setAuthenticatedUser(undefined);
  };

  const value = {
    authenticatedUser,
    signIn,
    signOut,
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
