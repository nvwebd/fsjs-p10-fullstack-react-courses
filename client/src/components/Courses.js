import React, { useEffect, useState } from 'react';
import { client } from '../utils/apiClient';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (courses.length === 0) {
      client('courses')
        .then((responseData) => {
          setCourses(responseData);
        })
        .catch((error) => {
          console.log('error happened: ', error);
        });
    }
  }, [courses, setCourses]);

  return (
    <div className="wrap main--grid">
      {courses.map((course) => {
        return (
          <a
            key={`course-${course.id}`}
            className="course--module course--link"
            href={`/courses/${course.id}`}
          >
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
          </a>
        );
      })}
      <a className="course--module course--add--module" href="/api/course/create">
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
      </a>
    </div>
  );
};

export default Courses;
