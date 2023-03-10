import React, { useEffect, useState } from 'react';
import { apiClient } from '../utils/apiClient';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Render all of the courses returned from the API
 * @returns {JSX.Element}
 * @constructor
 */
const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  /**
   * if courses are not loaded load all course from the API into the state
   */
  useEffect(() => {
    if (courses.length === 0) {
      apiClient('courses')
        .then((responseData) => {
          setCourses(responseData);
        })
        .catch((errors) => {
          if (errors === 500) {
            navigate('/error');
          }
        });
    }
  }, [courses, navigate, setCourses]);

  return (
    <div className="wrap main--grid">
      {courses.map((course) => {
        return (
          <Link
            key={`course-${course.id}`}
            className="course--module course--link"
            to={`/courses/${course.id}`}
          >
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        );
      })}
      <Link className="course--module course--add--module" to="/courses/create">
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </span>
      </Link>
    </div>
  );
};

export default Courses;
