import Home from 'page/home';
import Profile from 'page/profile';
import Search from 'page/search';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const RoutesConfig = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/search' element={<Search />}></Route>
      </Routes>
    </div>
  );
};

export default RoutesConfig;
