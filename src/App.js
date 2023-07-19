import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './component/Header/Header';
import Login from './component/Login/Login';
import Project from './component/Project/AddingProject';
import GetAllProjects from './component/Project/GetAllProjects';
import GetSingleProject from './component/Project/GetSingleProject';
import UpdateProject from './component/Project/UpdateProject';
import { isLoggedIn } from "./component/Login/Auth";

function PrivateRoute({ element, path }) {
  return isLoggedIn() ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Project />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/getall"
            element={<PrivateRoute element={<GetAllProjects />} />}
          />
          <Route
            path="/get"
            element={<PrivateRoute element={<GetSingleProject />} />}
          />
          <Route
            path="/update/:projectId"
            element={<PrivateRoute element={<UpdateProject />} />}
          />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
