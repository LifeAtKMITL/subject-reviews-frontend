import React from 'react';
import './navbarProfile.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';

const NavbarProfile = () => {
  return (
    <div className='profile_container'>
      <Link to='/'>
        <span className='profile_icon'>
          <ArrowBackIosIcon />
        </span>
      </Link>
      <div className='profile_name'>My Profile</div>
    </div>
  );
};

export default NavbarProfile;
