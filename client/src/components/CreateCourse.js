import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/apiClient';
import { useAuthContext } from '../context/AuthContext';

const CreateCourse = () => {
  const { authenticatedUser } = useAuthContext();
  const navigate = useNavigate();
  const [createCourseErrors, setCreateCourseErrors] = useState([]);

  /**
   * handle form cancel and redirect to the ROOT route /
   * @param event { Event}
   */
  const handleCreateCourseCancel = (event) => {
    event.preventDefault();
    navigate('/');
  };

  /**
   * handle new course submission
   * @param event { Event }
   */
  const handleCreateCourseSubmit = (event) => {
    event.preventDefault();

    /**
     * build course data object to submit
     * @type {{estimatedTime, materialsNeeded, description, title, userId: *}}
     */
    const createCourseData = {
      title: event.target.elements.courseTitle.value,
      description: event.target.elements.courseDescription.value,
      estimatedTime: event.target.elements.estimatedTime.value,
      materialsNeeded: event.target.elements.materialsNeeded.value,
      userId: authenticatedUser.id,
    };

    /**
     * send HTTP request to create a new Course
     */
    apiClient('courses', { data: createCourseData, user: authenticatedUser })
      .then(() => {
        navigate('/');
      })
      .catch((errors) => {
        if (errors === 500) {
          navigate('/error');
        } else {
          setCreateCourseErrors(errors);
        }
      });
  };

  return (
    <div className="wrap">
      <h2>Create Course</h2>

      {createCourseErrors.length > 0 ? (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {createCourseErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <form onSubmit={handleCreateCourseSubmit}>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input id="courseTitle" name="courseTitle" type="text" defaultValue="" />

            <p>
              By {authenticatedUser.firstName} {authenticatedUser.lastName}
            </p>

            <label htmlFor="courseDescription">Course Description</label>
            <textarea id="courseDescription" name="courseDescription" defaultValue="" />
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue="" />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea id="materialsNeeded" name="materialsNeeded" defaultValue="" />
          </div>
        </div>

        <button className="button" type="submit">
          Create Course
        </button>
        <button className="button button-secondary" onClick={handleCreateCourseCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
