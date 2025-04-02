import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Weather from './pages/Weather';
import Navbar from './components/Navbar';
import CityWeather from './pages/CityWeather';
import Register from './pages/Register';
import axios from 'axios';

function App() {
   const [user, setUser] = useState(null);
   const location = useLocation()

   useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
         const parsedUser = JSON.parse(storedUser);
         setUser(parsedUser)

         axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
      }
   }, []);

   if (user && location.pathname === '/login') {
      return <Navigate to="/weather" />
   }

   return (
      <div className="min-h-screen flex flex-col bg-gray-100">
         <Navbar user={user} setUser={setUser} />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route
               path="/weather"
               element={user ? <Weather user={user} /> : <Navigate to="/login" />}
            />
            <Route path='/weather/detail' element={user ? <CityWeather user={user} /> : <Navigate to="/login" />}></Route>
         </Routes>
      </div>
   );
}

export default App;
