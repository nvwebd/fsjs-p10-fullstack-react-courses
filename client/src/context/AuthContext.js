import React, { createContext, useContext, useState } from 'react';
import { apiClient } from '../utils/apiClient';

/**
 * Session Storage string where the logged in user is stored
 * @type {string}
 */
const sessionStorageKey = '__authenticated_user__';

/**
 * Get the current logged in user session data
 * @returns {Promise<string>}
 */
const getAuthUser = async () => {
  return window.sessionStorage.getItem(sessionStorageKey);
};

/**
 * Store the user data ( without password ) into the session storage
 * @param user
 * @returns {Promise<void>}
 */
const setAuthUser = async (user) => {
  window.sessionStorage.setItem(sessionStorageKey, user);
};

/**
 * Create a context with globally accessible functions and state for Authentication
 * @type {React.Context<{getAuthUser: (function(): Promise<string>), signIn: signIn, authenticatedUser: Promise<string>, signOut: signOut}>}
 */
const AuthContext = createContext({
  authenticatedUser: getAuthUser(),
  getAuthUser: getAuthUser,
  signIn: () => {},
  signOut: () => {},
});

/**
 * Set up the Provider and add actions and state for Authenticated User
 * @param props { object }
 * @returns {JSX.Element}
 * @constructor
 */
const AuthProvider = (props) => {
  const [authenticatedUser, setAuthenticatedUser] = useState();

  const signIn = async (user) => {
    const authenticatedUserInSessionStorage = await getAuthUser();

    if (authenticatedUserInSessionStorage) {
      const parsedSessionStorage = JSON.parse(authenticatedUserInSessionStorage);

      const authenticatedUserWithPassword = {
        ...parsedSessionStorage,
        password: user.password,
      };

      setAuthenticatedUser(authenticatedUserWithPassword);
    } else {
      apiClient('users', {
        user: user,
      })
        .then(async (userResponse) => {
          const userWithPassword = {
            ...userResponse,
            password: user.password,
          };

          await setAuthUser(JSON.stringify(userResponse));
          setAuthenticatedUser(userWithPassword);
        })
        .catch((error) => {
          console.log('Error Signing In: ', error);
        });
    }
  };
  const signOut = () => {
    setAuthenticatedUser(undefined);
    window.sessionStorage.removeItem(sessionStorageKey);
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

/**
 * Make context available to the App and setup a error if context is not used in the correct Provider
 * @returns {{getAuthUser: (function(): Promise<string>), signIn: undefined, authenticatedUser: Promise<string>, signOut: undefined}}
 */
const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used withing a AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuthContext };
