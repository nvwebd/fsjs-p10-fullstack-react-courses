import React, { useEffect, useState } from 'react';
import { apiClient } from '../utils/apiClient';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const UpdateCourse = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { authenticatedUser } = useAuthContext();

  const [courseData, setCourseData] = useState();
  const [updateCourseErrors, setUpdateCourseErrors] = useState([]);
  const handleUpdateCourseSubmit = (event) => {
    event.preventDefault();

    const formElements = event.target.elements;

    const updateCourseData = {
      courseTitle: formElements.courseTitle.value || undefined,
      courseDescription: formElements.courseDescription.value || undefined,
      estimatedTime: formElements.estimatedTime.value || undefined,
      materialsNeeded: formElements.materialsNeeded.value || undefined,
    };

    apiClient('users', { data: updateCourseData })
      .then((createCourseDataResponse) => {
        navigate('/');
      })
      .catch((errors) => {
        setUpdateCourseErrors(errors);
      });
  };
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
