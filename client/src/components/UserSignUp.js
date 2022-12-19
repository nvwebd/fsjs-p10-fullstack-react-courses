import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { apiClient } from '../utils/apiClient';
import { useAuthContext } from '../context/AuthContext';

/**
 * Render a Signup Form to create a new user
 * @returns {JSX.Element}
 * @constructor
 */
const UserSignUp = () => {
  const { signIn, signOut } = useAuthContext();
  const navigate = useNavigate();
  /**
   * errors state
   */
  const [signupErrors, setSignupErrors] = useState([]);
  /**
   * Button click event handler to cancel user registration and route back to root page
   * @param event { Event }
   */
  const handleSignUpCancel = (event) => {
    event.preventDefault();
    navigate('/');
  };

  /**
   * Submit event handler to create a new user account
   * @param event {Event}
   */
  const handleSignUpSubmit = (event) => {
    event.preventDefault();

    /**
     * Set up the sign in data object
     * @type {{firstName: string | undefined, lastName: string | undefined, emailAddress: string | undefined, password: string | undefined}}
     */
    const signInData = {
      firstName: event.target.elements.firstName.value || undefined,
      lastName: event.target.elements.lastName.value || undefined,
      emailAddress: event.target.elements.emailAddress.value || undefined,
      password: event.target.elements.password.value || undefined,
    };

    /**
     * call the client with new user data
     */
    apiClient('users', { data: signInData })
      .then(async () => {
        await signOut();

        await signIn({
          email: signInData.emailAddress,
          password: signInData.password,
        });

        navigate('/');
      })
      .catch((errors) => {
        if (errors === 500) {
          navigate('/error');
        } else {
          setSignupErrors(errors);
        }
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
        Already have a user account? Click here to <Link to="/signin">sign in</Link>!
      </p>
    </div>
  );
};

export default UserSignUp;
