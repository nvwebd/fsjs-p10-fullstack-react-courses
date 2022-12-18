import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const UserSignIn = () => {
  const { signIn } = useAuthContext();
  const navigate = useNavigate();

  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      emailAddress: event.target.elements.emailAddress.value || '',
      password: event.target.elements.password.value || '',
    };

    signIn(user);

    navigate('/');
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" defaultValue="" />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" defaultValue="" />

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
