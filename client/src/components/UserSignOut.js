import React, { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

/**
 * Render SingOut component to sing out the user, clear Session Storage and navigate to Root
 * @returns {JSX.Element}
 * @constructor
 */
const UserSignOut = () => {
  const { signOut } = useAuthContext();

  /**
   * before mount trigger the signout funtion and navigate user to ROOT route
   */
  useEffect(() => {
    signOut();
  }, [signOut]);

  return <Navigate to="/" />;
};

export default UserSignOut;
