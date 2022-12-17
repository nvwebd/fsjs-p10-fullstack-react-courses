import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const PrivateRoute = (props) => {
  const { children, path } = props;

  const { authenticatedUser } = useAuthContext();
  const navigate = useNavigate();

  if (!authenticatedUser) {
    navigate('/signin');
  }

  return <Route path={path} element={children} />;
};

export default PrivateRoute;
