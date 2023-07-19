import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProjectCard from './ProjectCards';


const GetAllProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://projectmanagementapi.shivila.online/int/ddmanagement');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('An error occurred while fetching projects.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {projects.map((project) => (
          <div key={project.id} className="col-md-4 mb-4">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllProjects;
