import React, { useEffect, useState } from 'react';
import { apiClient } from '../utils/apiClient';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

/**
 * Render the selected Course with Input Elements to update the Course
 * @returns {JSX.Element}
 * @constructor
 */
const UpdateCourse = () => {
  const { authenticatedUser } = useAuthContext();
  const navigate = useNavigate();
  const params = useParams();

  const [courseData, setCourseData] = useState();
  const [updateCourseErrors, setUpdateCourseErrors] = useState([]);
  /**
   * Handle Update Submitted Course
   * @param event { Event}
   */
  const handleUpdateCourseSubmit = (event) => {
    event.preventDefault();

    const updateCourseData = {
      title: event.target.elements.courseTitle.value || undefined,
      description: event.target.elements.courseDescription.value || undefined,
      estimatedTime: event.target.elements.estimatedTime.value || undefined,
      materialsNeeded: event.target.elements.materialsNeeded.value || undefined,
    };

    apiClient(`courses/${params.id}`, {
      data: updateCourseData,
      user: authenticatedUser,
      method: 'PUT',
    })
      .then(() => {
        navigate('/');
      })
      .catch((errors) => {
        if (errors === 500) {
          navigate('/error');
        } else {
          setUpdateCourseErrors(errors);
        }
      });
  };
  /**
   * Handle cancelling the update
   * @param event { Event }
   */
  const handleUpdateCourseCancel = (event) => {
    event.preventDefault();
    navigate('/');
  };

  useEffect(() => {
    if (!courseData) {
      apiClient(`courses/${params.id}`)
        .then((course) => {
          if (course.userId !== authenticatedUser.id) {
            navigate('/forbidden');
          } else {
            setCourseData(course);
          }
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
  }, [authenticatedUser.id, courseData, navigate, params.id]);

  return (
    <div className="wrap">
      <h2>Update Course</h2>

      {updateCourseErrors.length > 0 ? (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {updateCourseErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {courseData ? (
        <form onSubmit={handleUpdateCourseSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                defaultValue={courseData.title}
              />

              <p>
                By {courseData.user.firstName} {courseData.user.lastName}
              </p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                defaultValue={courseData.description}
              />
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                defaultValue={courseData.estimatedTime}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                defaultValue={courseData.materialsNeeded}
              />
            </div>
          </div>
          <button className="button" type="submit">
            Update Course
          </button>
          <button className="button button-secondary" onClick={handleUpdateCourseCancel}>
            Cancel
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default UpdateCourse;
