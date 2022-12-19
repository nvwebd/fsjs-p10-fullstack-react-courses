import React, { useEffect, useState } from 'react';
import { apiClient } from '../utils/apiClient';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown';

/**
 * Render the Details of the selected Course
 * @returns {JSX.Element}
 * @constructor
 */
const CourseDetail = () => {
  const { authenticatedUser } = useAuthContext();
  const navigate = useNavigate();
  const params = useParams();

  /**
   * state to follow the current course changes ( based on :id params )
   */
  const [course, setCourse] = useState();

  /**
   * delete course when the button is clicked
   */
  const handleDeleteCourse = () => {
    /**
     * send HTTP request to delete the Course
     */
    apiClient(`courses/${params.id}`, { method: 'DELETE', user: authenticatedUser })
      .then(() => {
        navigate(`/`);
      })
      .catch((errors) => {
        if (errors === 500) {
          navigate('/error');
        } else {
          console.error('Error deleting course: ', errors);
        }
      });
  };

  /**
   * before component mount check if we have the course data else load it into the state
   */
  useEffect(() => {
    if (!course) {
      apiClient(`courses/${params.id}`)
        .then((responseData) => {
          setCourse(responseData);
        })
        .catch((error) => {
          if (error === 500) {
            navigate('/error');
          }

          if (error.statusCode === 404) {
            navigate('/notfound');
          }
        });
    }
  }, [course, navigate, params.id]);

  return (
    <>
      <div className="actions--bar">
        <div className="wrap">
          {authenticatedUser && course && authenticatedUser.id === course.userId ? (
            <>
              <Link className="button" to={`/courses/${params.id}/update`}>
                Update Course
              </Link>
              <button className="button" onClick={handleDeleteCourse}>
                Delete Course
              </button>
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
                  <ReactMarkdown>{course.description}</ReactMarkdown>
                </div>
                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>{course.estimatedTime}</p>

                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ul className="course--detail--list">
                    <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
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
