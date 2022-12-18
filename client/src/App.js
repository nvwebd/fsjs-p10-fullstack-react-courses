import React from 'react';
import './styles/reset.css';
import './styles/global.css';
import { Route, Routes } from 'react-router-dom';

import DefaultLayout from './layout/DefaultLayout';
import Courses from './components/Courses';
import NotFound from './components/NotFound';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import PrivateRoute from './components/PrivateRoute';
import Forbidden from './components/Forbidden';
import Error from './components/Error';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Courses />} />
        <Route path="courses">
          <Route path=":id" element={<CourseDetail />} />
          <Route
            path=":id/update"
            element={
              <PrivateRoute>
                {' '}
                <UpdateCourse />
              </PrivateRoute>
            }
          />
          <Route
            path="create"
            element={
              <PrivateRoute>
                <CreateCourse />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="signin" element={<UserSignIn />} />
        <Route path="signup" element={<UserSignUp />} />
        <Route path="signout" element={<UserSignOut />} />
        <Route path="notfound" element={<NotFound />} />
        <Route path="forbidden" element={<Forbidden />} />
        <Route path="error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
