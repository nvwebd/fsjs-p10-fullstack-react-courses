import React from 'react';

import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

/**
 * Render a HOC component to protect a Route
 * @param props { props: {object: children} }
 * @returns {*|JSX.Element}
 * @constructor
 */
const PrivateRoute = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;

  const { authenticatedUser } = useAuthContext();

  if (!authenticatedUser) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default PrivateRoute;
