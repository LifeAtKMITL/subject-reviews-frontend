import React, { useEffect, useState } from 'react';
import './navbar.css';
import LifeKMITL from 'assets/images/LifeKMITL.png';
import { Link } from 'react-router-dom';
import axios from 'utils/axios';

const NavBar = () => {
  const [userImg, setUserImg] = useState();
  const apiUserProfile = '/blogreview/userreviews';
  useEffect(() => {
    const getuserProfile = async () => {
      const { data: res } = await axios.get(apiUserProfile);
      setUserImg(res.image);
    };
    getuserProfile();
  }, []);

  return (
    <div className='navbar-bg'>
      <Link to='/'>
        <img className='nav_icon' src={LifeKMITL} alt='' />
      </Link>
      <Link to='/profile'>
        <img className='nav_user' src={userImg} alt='' />
      </Link>
    </div>
  );
};

export default NavBar;
