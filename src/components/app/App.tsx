
import '../../App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Auth from './Auth';
import Login from '../user/Login';
import Register from '../user/Register';

export default function () {
  return (
    <BrowserRouter>
      <Auth>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>

          <Route path='/' element={<>helo world</>}/>
        </Routes>
      </Auth>
    </BrowserRouter>
  );
}