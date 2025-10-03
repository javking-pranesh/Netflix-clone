import React, { useEffect } from 'react';
import Home from './pages/Home/Home.jsx';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import Player from './pages/Player/Player.jsx';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && window.location.pathname !== '/') {
        console.log("Logged In");
        navigate('/');
      } else if (!user && window.location.pathname !== '/login') {
        console.log("Logged Out");
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;
