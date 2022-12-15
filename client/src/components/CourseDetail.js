import React, { useEffect, useState } from 'react';
import { client } from '../utils/apiClient';

const CourseDetail = () => {
  const [course, setCourse] = useState();

  useEffect(() => {
    if (!course) {
      client('courses/1')
        .then((responseData) => {
          // TODO: split description?
          // TODO: split materialsNeeded?
          setCourse(responseData);
        })
        .catch((error) => {
          console.log('error happened: ', error);
        });
    }
  }, [course]);

  console.log('course: ', course);

  return (
    <>
      <div className="actions--bar">
        <div className="wrap">
          <a className="button" href="update-course.html">
            Update Course
          </a>
          <a className="button" href="/api/course/delete">
            Delete Course
          </a>
          <a className="button button-secondary" href="index.html">
            Return to List
          </a>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            {course ? (
              <>
                <div>
                  <h3 className="course--detail--title">Course</h3>
                  <h4 className="course--name">{course.title}</h4>
                  <p>{`By ${course.user.firstName} ${course.user.lastName}`}</p>
                  {course.description}
                </div>
                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>{course.estimatedTime}</p>

                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ul className="course--detail--list">
                    <li key={`course-material-item-${course.id}`}>{course.materialsNeeded}</li>
                  </ul>
                </div>
              </>
            ) : null}
          </div>
        </form>
      </div>
    </>
  );
};

export default CourseDetail;
