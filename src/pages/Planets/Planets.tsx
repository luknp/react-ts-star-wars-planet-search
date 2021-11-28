import React, { useState, useEffect } from 'react';
import SearchInput from 'components/SearchInput';
import Spinner from 'components/Spinner';
import useFetchPlanets, { FetchStatus } from './hooks/useFetchPlanets';
import useFilter from './hooks/useFilter';
import { Planet } from 'types';
import { getAllData } from 'utils';
import './style.scss';

const API_PLANETS_URL = 'https://swapi.dev/api/planets';

export default function Planets() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const { status, data, error } = useFetchPlanets(API_PLANETS_URL);
  const { filteredData } = useFilter(searchPhrase, data);

  const checkStatus = (expectedStatus: FetchStatus): boolean => {
    if (status === expectedStatus) {
      return true;
    }
    return false;
  };

  return (
    <div className='planets'>
      <header className=''>
        <h2>Search for a planet</h2>
      </header>
      <SearchInput searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} placeholder='Search for a planet' />
      <div className='planets__content flex-center'>
        {checkStatus(FetchStatus.Loading) && <Spinner />}
        {checkStatus(FetchStatus.Error) && <p>{error?.message}</p>}

        {checkStatus(FetchStatus.Fetched) && (
          <ul className='planets__content-cards'>
            {filteredData.map((planet: Planet) => (
              <li key={planet.name} className=''>
                <p>{planet.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
