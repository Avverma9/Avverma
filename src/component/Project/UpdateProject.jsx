import React, { useState } from 'react';
import styles from "../../styles/AddingProject.module.css"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const UpdateProject = ({ project, handleUpdate }) => {
  const [formData, setFormData] = useState({
    name_of_the_project: project.name_of_the_project,
    client_name: project.client_name,
    client_mobile_number: project.client_mobile_number,
    project_start_date: project.project_start_date,
    project_end_date: project.project_end_date,
    frontend_developer1: project.frontend_developer1 || '',
    frontend_developer2: project.frontend_developer2 || '',
    frontend_developer3: project.frontend_developer3 || '',
    frontend_developer4: project.frontend_developer4 || '',
    frontend_developer5: project.frontend_developer5 || '',
    backend_developer1: project.backend_developer1 || '',
    backend_developer2: project.backend_developer2 || '',
    backend_developer3: project.backend_developer3 || '',
    backend_developer4: project.backend_developer4 || '',
    backend_developer5: project.backend_developer5 || '',
    percent_complete: project.percent_complete || '',
    Remarks: project.Remarks || '',
    approximate_budget: project.approximate_budget || '',
  });
  
  console.log(project, "projectdata")
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedFormData = {
      ...formData,
      project_start_date: formatDate(formData.project_start_date),
      project_end_date: formatDate(formData.project_end_date),
    };
  
    console.log(formattedFormData, "formattedFormData");
    console.log(formData.name_of_the_project, "API")

    try {
      const response = await fetch(`https://projectmanagementapi.shivila.online/int/ddmanagement/${formData.name_of_the_project}/`, {
        method: 'PATCH',
        body: JSON.stringify(formattedFormData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      

      if(response.ok){
        window.location.reload()
      }
       toast.success('Project updated successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });

      handleUpdate();
    } catch (error) {
      console.error('Error updating project:', error);


      toast.error('Error updating project. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Client Name:</label>
          <input
            type="text"
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>Mobile:</label>
          <input
            type="text"
            name="client_mobile_number"
            value={formData.client_mobile_number}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>Start Date:</label>
          <input
            type="date"
            name="project_start_date"
            value={formData.project_start_date}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>End Date:</label>
          <input
            type="date"
            name="project_end_date"
            value={formData.project_end_date}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>Front Developer 1:</label>
          <input
            type="text"
            name="frontend_developer1"
            value={formData.frontend_developer1}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>Front Developer 2:</label>
          <input
            type="text"
            name="frontend_developer2"
            value={formData.frontend_developer2}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Front Developer 3:</label>
          <input
            type="text"
            name="frontend_developer3"
            value={formData.frontend_developer3}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Front Developer 4:</label>
          <input
            type="text"
            name="frontend_developer4"
            value={formData.frontend_developer4}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Front Developer 5:</label>
          <input
            type="text"
            name="frontend_developer5"
            value={formData.frontend_developer5}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>Backend Developer 1:</label>
          <input
            type="text"
            name="backend_developer1"
            value={formData.backend_developer1}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>Backend Developer 2:</label>
          <input
            type="text"
            name="backend_developer2"
            value={formData.backend_developer2}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Backend Developer 3:</label>
          <input
            type="text"
            name="backend_developer3"
            value={formData.backend_developer3}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Backend Developer 4:</label>
          <input
            type="text"
            name="backend_developer4"
            value={formData.backend_developer4}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Backend Developer 5:</label>
          <input
            type="text"
            name="backend_developer5"
            value={formData.backend_developer5}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>Completion Status:</label>
          <input
            type="text"
            name="percent_complete"
            value={formData.percent_complete}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>Remarks:</label>
          <input
            type="text"
            name="Remarks"
            value={formData.Remarks}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>Budget:</label>
          <input
            type="text"
            name="approximate_budget"
            value={formData.approximate_budget}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <button type="submit">Update</button>
        <button type="button" onClick={handleUpdate}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;
