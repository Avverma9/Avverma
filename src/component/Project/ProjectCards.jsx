import { useState } from "react";
import UpdateProject from "./UpdateProject";
import styles from "../../styles/ProjectCards.module.css"



const ProjectCard = ({ project }) => {
    const [isEditing, setIsEditing] = useState(false);
  
    const handleDeleteClick = async () => {
      try {
        await fetch(`https://projectmanagementapi.shivila.online/int/ddmanagement/${project.name_of_the_project}/`, {
          method: 'DELETE', 
        });
        
        window.location.reload();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    };

    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    const handleCancelEdit = () => {
      setIsEditing(false);
    };
  
    return (
      <div className={styles.projectCard}>
        {isEditing ? (
          <UpdateProject project={project} handleUpdate={handleCancelEdit} />
        ) : (
          <div>
            <h2>{project.name_of_the_project}</h2>
            <p>Client: {project.client_name}</p>
            <p>Start Date: {project.project_start_date}</p>
            <p>End Date: {project.project_end_date}</p>
            <button  onClick={handleEditClick}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </div>
        )}
      </div>
    );
  };
  
  export default ProjectCard;