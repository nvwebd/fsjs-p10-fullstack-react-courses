import React, { useEffect, useState } from 'react';
import { apiClient } from '../utils/apiClient';
import { Link, useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const CourseDetail = () => {
  const { authenticatedUser } = useAuthContext();

  console.log('authenticatedUser: ', authenticatedUser);

  const [course, setCourse] = useState();
  const params = useParams();

  useEffect(() => {
    if (!course) {
      apiClient(`courses/${params.id}`)
        .then((responseData) => {
          // TODO: split description?
          // TODO: split materialsNeeded?
          setCourse(responseData);
        })
        .catch((error) => {
          console.log('error happened: ', error);
        });
    }
  }, [course, params.id]);

  console.log('course: ', course);

  return (
    <>
      <div className="actions--bar">
        <div className="wrap">
          {authenticatedUser && course && authenticatedUser.id === course.userId ? (
            <>
              <Link className="button" to={`/courses/${params.id}/update`}>
                Update Course
              </Link>
              <Link className="button" to="/course/delete">
                Delete Course
              </Link>
            </>
          ) : null}

          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
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
