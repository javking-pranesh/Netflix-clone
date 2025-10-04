import React, { useEffect } from 'react';
import Home from './pages/Home/Home.jsx';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import Player from './pages/Player/Player.jsx';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      if (window.location.pathname === '/login') {
        navigate('/');
      }
    } else {
      if (window.location.pathname !== '/login') {
        navigate('/login');
      }
    }
  });

  return () => unsubscribe();
}, [navigate]);

  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;
