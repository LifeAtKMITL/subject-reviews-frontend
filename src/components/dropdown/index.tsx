import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import Checkbox from '@mui/material/Checkbox';
import './index.css';

interface IDropdown {
  options: string[];
  selected: string[];
  isActive: boolean;
  RemoveSelected(e: string): void;
  handleSelectDropdown(e: string): void;
  handleButton(): void;
}

const Dropdown: React.FC<IDropdown> = ({
  isActive,
  selected,
  RemoveSelected,
  handleSelectDropdown,
  handleButton,
  options,
}) => {
  return (
    <div className=''>
      <div className='dropdown__container'>
        <button className='dropdown__btn' onClick={handleButton}>
          {selected.length == 0 ? 'All' : `${selected.length} Selected`}
        </button>
        {isActive && (
          <div className='dropdown__content'>
            {options.map((text) => (
              <div className='dropdown__item' onClick={() => handleSelectDropdown(text)}>
                {text}
              </div>
            ))}
          </div>
        )}
      </div>
      {selected && (
        <div className='dropdown__select'>
          {
            <div className='dropdown__selectBox'>
              {selected.map((select) => (
                <div className='selectBox'>
                  {select}
                  <div
                    className='close__dropdown'
                    onClick={() => {
                      RemoveSelected(select);
                    }}
                  >
                    <CancelIcon className='close__icon' />
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default Dropdown;
