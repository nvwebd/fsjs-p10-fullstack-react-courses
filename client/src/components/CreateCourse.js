import React from 'react';

const CreateCourse = () => {
  const handleCreateCourseCancel = () => {};

  const handleCreateCourseSubmit = () => {};

  return (
    <div className="wrap">
      <h2>Create Course</h2>

      <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
          <li>Please provide a value for &quot;Title&quot;</li>
          <li>Please provide a value for &quot;Description&quot;</li>
        </ul>
      </div>

      <form onSubmit={handleCreateCourseSubmit}>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input id="courseTitle" name="courseTitle" type="text" value="" />

            <p>By Joe Smith</p>

            <label htmlFor="courseDescription">Course Description</label>
            <textarea id="courseDescription" name="courseDescription" />
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input id="estimatedTime" name="estimatedTime" type="text" value="" />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
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
