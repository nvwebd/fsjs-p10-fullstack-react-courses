import React from 'react';
import { Link } from 'react-router-dom';

const UserSignIn = () => {
  const handleCancel = (event) => {
    event.preventDefault();
    // location.href = 'index.html';
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('submitting');
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" value="" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value="" />
        <button className="button" type="submit">
          Sign In
        </button>

        <button className="button button-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      <p>
        Don&apos;t have a user account? Click here to <Link to="signup">sign up</Link>!
      </p>
    </div>
  );
};

export default UserSignIn;
