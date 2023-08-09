import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './Components/Header/Header';

function App() {
  return (
   <BrowserRouter>
   <Header/>

   <div className='app d-flex'>
   <div className='content p-4'>
   <Routes>
    {/* <Route path='/' element={<SideBar/>}/> */}
   </Routes>
   </div>
   </div>
   </BrowserRouter>
  );
}

export default App;
