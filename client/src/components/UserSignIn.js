import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

/**
 * Render the SingIn Component for a User to sign in
 * @returns {JSX.Element}
 * @constructor
 */
const UserSignIn = () => {
  /**
   * get the signIn function from the context
   */
  const { signIn } = useAuthContext();
  const navigate = useNavigate();

  /**
   * handle cancel button click to prevent form submission and route to ROOR route
   * @param event { Event}
   */
  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/');
  };

  /**
   * handle submit handler to login the user
   * @param event { Event }
   * @returns {Promise<void>}
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      emailAddress: event.target.elements.emailAddress.value || '',
      password: event.target.elements.password.value || '',
    };

    await signIn(user);

    /**
     * navigate back to the previous page
     */
    navigate(-1);
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
        Don&apos;t have a user account? Click here to <Link to="/signup">sign up</Link>!
      </p>
    </div>
  );
};

export default UserSignIn;
