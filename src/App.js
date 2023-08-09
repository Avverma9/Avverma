import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from '../src/Admin/Header/Header';
import Partner from './Admin/AddHotel/AddHotel.jsx';

function App() {
  return (
   <BrowserRouter>
   <Header/>

   <div className='app d-flex'>
   <div className='content p-4'>
   <Routes>
    {/* <Route path='/' element={<SideBar/>}/> */}
    <Route path='/gethotels' element={<Partner/>}/>
   </Routes>
   </div>
   </div>
   </BrowserRouter>
  );
}

export default App;
