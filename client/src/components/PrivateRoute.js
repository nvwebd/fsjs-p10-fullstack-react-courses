import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

/**
 * Render a HOC component to protect a Route
 * @param props { props: {object: children} }
 * @returns {*|JSX.Element}
 * @constructor
 */
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const location = useLocation();

  /**
   * get authenticated user from context
   */
  const { authenticatedUser } = useAuthContext();

  /**
   * if no authenticated user is available navigate the user to the signin page and update router state to mark
   * where we routed from in the signin page
   */
  if (!authenticatedUser) {
    return <Navigate to="/signin" state={{ from: location.pathname }} />;
  }

  return children;
};

export default PrivateRoute;
