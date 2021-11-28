import React from 'react';
import './style.scss';

type Props = {
  message?: string;
  handleRefresh?: () => void;
};

export default function ErrorInfo({ message, handleRefresh }: Props) {
  return (
    <div className='error'>
      <h2>ERROR!</h2>
      <h4 className='error__info'>{message || 'Something went wrong while retrieving data from the server'}</h4>
      <button onClick={handleRefresh} className='error__refresh-button'>
        <svg
          className='error__refresh-button__icon'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='currentColor'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' /> <path d='M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5' />
          <path d='M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5' />
        </svg>
        Refresh
      </button>
    </div>
  );
}
