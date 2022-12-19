import React from 'react';

/**
 * Render a Error page when a 500 Error Code is returned by the API
 * @returns {JSX.Element}
 * @constructor
 */
const Error = () => {
  return (
    <div className="wrap">
      <h2>Error</h2>
      <p>Sorry! We just encountered an unexpected error.</p>
    </div>
  );
};

export default Error;
