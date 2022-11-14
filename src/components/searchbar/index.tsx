import React, { useState } from 'react';
import './index.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

interface ISearch {
  fun(e: React.FormEvent<HTMLInputElement>): void;
}

const Searchbar: React.FC<ISearch> = ({ fun }) => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate('/');
  };

  return (
    <div className='searchbar__container'>
      <ArrowBackIosIcon onClick={handleBackButton} />
      <div>
        <div className='input__container'>
          <SearchIcon />
          <input type='text' placeholder='Search' className='input__text' onChange={fun} />
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
