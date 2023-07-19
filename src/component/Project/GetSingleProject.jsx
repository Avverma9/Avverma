import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectCard from "./ProjectCards";

const GetSingleProject = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchProjectData = async (projectName) => {
    try {
      const response = await fetch(`https://projectmanagementapi.shivila.online/int/ddmanagement/${projectName}`);
      const data = await response.json();
      setError(null);
      setProjects([data]);
      toast.success("Project data fetched successfully!");
    } catch (error) {
      console.error("Error fetching project data:", error);
      setError("Error fetching project data. Please try again later.");
      setProjects([]);
      toast.error("Error fetching project data. Please try again later.");
    }
  };
  

  const deleteProject = async (projectName) => {
    try {
      const response = await fetch(`https://projectmanagementapi.shivila.online/int/ddmanagement/${projectName}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log("Project deleted successfully.");
        setProjects(projects.filter((project) => project.name_of_the_project !== projectName));
        setError(null);
        toast.success("Project deleted successfully!");
      } else {
        console.error("Error deleting project:", response.statusText);
        setError("Error deleting project. Please try again later.");
        toast.error("Error deleting project. Please try again later.");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      setError("Error deleting project. Please try again later.");
      toast.error("Error deleting project. Please try again later.");
    }
  };
  

  const filteredProjects = projects.filter((project) => {
    return project.name_of_the_project.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search project..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <button onClick={() => fetchProjectData(searchQuery)}>Fetch Project</button>

      {error && <p>{error}</p>}

      {filteredProjects.map((project) => (
        <div key={project.name_of_the_project}>
          <ProjectCard project={project} />
          <button onClick={() => deleteProject(project.name_of_the_project)}>Delete Project</button>
        </div>
      ))}
    </div>
  );
};

export default GetSingleProject;
