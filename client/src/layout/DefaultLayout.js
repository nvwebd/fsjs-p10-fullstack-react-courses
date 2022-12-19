import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header';

/**
 * Render a Layout Wrapper component
 * @returns {JSX.Element}
 * @constructor
 */
const DefaultLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default DefaultLayout;
