import logo from './logo.svg';
import './App.css';
import Header from './component/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/Login/Login';

import Project from './component/Project/AddingProject';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Project/>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path='/add' element={Project}/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
