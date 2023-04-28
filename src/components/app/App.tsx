import '../../App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Login from '../user/Login';
import Register from '../user/Register';
import { createContext, useLayoutEffect, useState } from 'react';
import { API, User } from '../init';

const UserContext = createContext<User | null>(null)

export default function () {
  const [user, setU] = useState<null|User>(null)

  useLayoutEffect(()=>{
    API.get<User>('/auth/user').then((res)=> setU(res.data))
  },[user])

  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
        <Routes>
            {!user ? <>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='*' element={<Navigate to="/login"/>}/>
            </> : <>
              <Route path='/' element={<>helo world</>}/>
              <Route path='*' element={<>404</>}/>
            </>}
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}