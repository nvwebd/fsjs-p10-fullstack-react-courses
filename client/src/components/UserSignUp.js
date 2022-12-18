import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { apiClient } from '../utils/apiClient';
// import { useAuthContext } from '../context/AuthContext';

const UserSignUp = () => {
  const navigate = useNavigate();
  // const { signIn } = useAuthContext();

  const [signupErrors, setSignupErrors] = useState([]);
  const handleSignUpCancel = (event) => {
    event.preventDefault();
    navigate('/');
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();

    const signInData = {
      firstName: event.target.elements.firstName.value || undefined,
      lastName: event.target.elements.lastName.value || undefined,
      email: event.target.elements.emailAddress.value || undefined,
      password: event.target.elements.password.value || undefined,
    };

    apiClient('users', { data: signInData })
      .then((signInResponse) => {
        navigate('/');
      })
      .catch((errors) => {
        setSignupErrors(errors);
      });
  };

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>

      {signupErrors.length > 0 ? (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {signupErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <form onSubmit={handleSignUpSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" defaultValue="" />
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" defaultValue="" />
        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" defaultValue="" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" defaultValue="" />
        <button className="button" type="submit">
          Sign Up
        </button>
        <button className="button button-secondary" onClick={handleSignUpCancel}>
          Cancel
        </button>
      </form>
      <p>
        Already have a user account? Click here to <Link to="signin">sign in</Link>!
      </p>
    </div>
  );
};

export default UserSignUp;
