import React, { useRef } from 'react';
import './style.scss';

type Props = {
  searchPhrase: string;
  setSearchPhrase: (searchPhrase: string) => void;
  placeholder?: string;
};

export default function SearchInput({ searchPhrase, setSearchPhrase, placeholder }: Props) {
  const inputElement = useRef<HTMLInputElement>(null);

  const handleClearInput = () => {
    setSearchPhrase('');
    inputElement.current?.focus();
  };

  return (
    <form className='search'>
      <input
        type='search'
        name='search-form'
        id='search-form'
        className='search__input'
        autoComplete='off'
        placeholder={placeholder || 'Search'}
        value={searchPhrase}
        onChange={e => setSearchPhrase(e.target.value)}
        ref={inputElement}
      />
      <svg width='24' height='24' fill='currentColor' className='search__icon search__icon--loupe' data-darkreader-inline-fill=''>
        <path d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'></path>
      </svg>
      {searchPhrase && (
        <svg
          className='search__icon search__icon--clear'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='currentColor'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
          onClick={handleClearInput}
        >
          <path stroke='none' d='M0 0h24v24H0z' /> <line x1='18' y1='6' x2='6' y2='18' /> <line x1='6' y1='6' x2='18' y2='18' />
        </svg>
      )}
    </form>
  );
}
