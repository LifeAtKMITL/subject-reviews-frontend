import React from 'react';
import './loading.css';
import LifeKMITL from 'assets/images/LifeKMITL.png';

const Loading = () => {
  return (
    <div className='load-container'>
      <div className='icon-loading'>
        <img src={LifeKMITL} alt='' />
      </div>
      <div className='lds-roller'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
