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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Courses />} />
        <Route path="courses">
          <Route path=":id" element={<CourseDetail />} />
          <PrivateRoute path=":id/update" element={<UpdateCourse />} />
          <PrivateRoute path="create" element={<CreateCourse />} />
        </Route>
        <Route path="signin" element={<UserSignIn />} />
        <Route path="signup" element={<UserSignUp />} />
        <Route path="signout" element={<UserSignOut />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
