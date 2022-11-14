import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import SearchIcon from '@mui/icons-material/Search';
const SearchButton = () => {
  const navigate = useNavigate();
  const handleButton = () => {
    navigate('/search');
  };
  return (
    <div className='search__container' onClick={handleButton}>
      <SearchIcon className='icon__search' />
    </div>
  );
};

export default SearchButton;
