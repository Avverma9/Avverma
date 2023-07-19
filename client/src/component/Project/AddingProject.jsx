import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './AddingProject.module.css';

const Project = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    clientName: '',
    mobile: '',
    startDate: '',
    endDate: '',
    frontDeveloper1: '',
    frontDeveloper2: '',
    frontDeveloper3: '',
    frontDeveloper4: '',
    frontDeveloper5: '',
    backendDeveloper1: '',
    backendDeveloper2: '',
    backendDeveloper3: '',
    backendDeveloper4: '',
    backendDeveloper5: '',
    completionStatus: '',
    remarks: '',
    budget: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Project saved:', data);
        // Handle successful form submission here, e.g., show a success message.
      })
      .catch((error) => {
        console.error('Error saving project:', error);
        // Handle error here, e.g., show an error message.
      });
  };

  if (location.pathname !== '/add') {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Client Name:</label>
        <input
          type="text"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label}>Mobile:</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label}>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label}>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label}>Front Developer 1:</label>
        <input
          type="text"
          name="frontDeveloper1"
          value={formData.frontDeveloper1}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label}>Front Developer 2:</label>
        <input
          type="text"
          name="frontDeveloper2"
          value={formData.frontDeveloper2}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      {/* Add other input fields similarly for Front Developer 3, 4, and 5 */}

      <div className={styles.inputContainer}>
        <label className={styles.label}>Backend Developer 1:</label>
        <input
          type="text"
          name="backendDeveloper1"
          value={formData.backendDeveloper1}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label}>Backend Developer 2:</label>
        <input
          type="text"
          name="backendDeveloper2"
          value={formData.backendDeveloper2}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      {/* Add other input fields similarly for Backend Developer 3, 4, and 5 */}

      <div className={styles.inputContainer}>
        <label className={styles.label}>Completion Status:</label>
        <input
          type="text"
          name="completionStatus"
          value={formData.completionStatus}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label}>Remarks:</label>
        <input
          type="text"
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label}>Budget:</label>
        <input
          type="text"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
};

export default Project;
