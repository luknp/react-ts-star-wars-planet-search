import React from 'react';
import './style.scss';

export default function Spinner() {
  return (
    <div className='spinner'>
      <span className='spinner__inner--1'></span>
      <span className='spinner__inner--2'></span>
      <span className='spinner__inner--3'></span>
    </div>
  );
}
