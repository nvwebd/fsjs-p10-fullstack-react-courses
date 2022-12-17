import React, { createRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const UserSignIn = () => {
  const { signIn } = useAuthContext();

  const emailRef = createRef();
  const passwordRef = createRef();

  const handleCancel = (event) => {
    event.preventDefault();
    // location.href = 'index.html';
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('event.target: ', event.currentTarget);

    const user = {
      emailAddress: emailRef.current.value,
      password: passwordRef.current.value,
    };

    // console.log('user: ', user);

    signIn(user);

    console.log('submitting');
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" defaultValue="" ref={emailRef} />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" defaultValue="" ref={passwordRef} />

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
