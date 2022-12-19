import React from 'react';

/**
 * Render a NotFound page when a 404 is returned from the API or any uninitialized route is requested
 * @returns {JSX.Element}
 * @constructor
 */
const NotFound = () => {
  return (
    <div className="wrap">
      <h2>Not Found</h2>
      <p>Sorry! We couldn&apos;t find the page you&apos;re looking for.</p>
    </div>
  );
};

export default NotFound;
