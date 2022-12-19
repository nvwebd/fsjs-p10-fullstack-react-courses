import React from 'react';

/**
 * Render the Forbidden page when a user tries to access a Protected route or a protected action
 * @returns {JSX.Element}
 * @constructor
 */
const Forbidden = () => {
  return (
    <div className="wrap">
      <h2>Forbidden</h2>
      <p>Oh oh! You can&apos;t access this page.</p>
    </div>
  );
};

export default Forbidden;
