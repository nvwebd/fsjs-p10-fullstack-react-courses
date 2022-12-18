import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Header = () => {
  const { authenticatedUser } = useAuthContext();

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {authenticatedUser ? (
            <ul className="header--signedin">
              <li>
                Welcome, {authenticatedUser.firstName} {authenticatedUser.lastName}!
              </li>
              <li>
                <Link to="/signout">Sign Out</Link>
              </li>
            </ul>
          ) : (
            <ul className="header--signedout">
              <li>
                <a href="/signup">Sign Up</a>
              </li>
              <li>
                <a href="/signin">Sign In</a>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
