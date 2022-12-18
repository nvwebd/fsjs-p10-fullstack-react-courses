import React, { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const UserSignOut = () => {
  const { signOut } = useAuthContext();

  useEffect(() => {
    signOut();
  }, [signOut]);

  return <Navigate to="/" replace />;
};

export default UserSignOut;
