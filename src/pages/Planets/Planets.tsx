import React, { useState } from 'react';
import SearchInput from '../../components/SearchInput';
import PlanetCard from './components/PlanetCard';
import Spinner from 'components/Spinner';
import ErrorInfo from 'components/ErrorInfo';
import { Planet } from 'types';
import useFetchPlanets, { FetchStatus } from './hooks/useFetchPlanets';
import useFilter from './hooks/useFilter';
import './style.scss';

const API_PLANETS_URL = 'https://swapi.dev/api/planets';

export default function Planets() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [refresh, setRefresh] = useState(false);
  const { status, data, error } = useFetchPlanets(API_PLANETS_URL, refresh, () => setRefresh(false));
  const { filteredData } = useFilter(searchPhrase, data);

  const checkStatus = (expectedStatus: FetchStatus): boolean => {
    if (status === expectedStatus) {
      return true;
    }
    return false;
  };
  // const status2 = FetchStatus.Error;

  return (
    <div className='planets'>
      <header className=''>
        <h2>Search for a planet</h2>
      </header>
      <SearchInput searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} placeholder='Search for a planet' />
      <div className='planets__content flex-center'>
        {checkStatus(FetchStatus.Loading) && <Spinner />}
        {checkStatus(FetchStatus.Error) && <ErrorInfo message={error?.message} handleRefresh={() => setRefresh(true)} />}
        {checkStatus(FetchStatus.Fetched) && (
          <ul className='planets__content-cards' data-testid='planets-list'>
            {filteredData.length > 0
              ? filteredData.map((planet: Planet) => (
                  <li key={planet.name} className='' data-testid='planet-item'>
                    <PlanetCard planet={planet} />
                  </li>
                ))
              : searchPhrase && (
                  <p>
                    No result for phrase <b>{searchPhrase}</b>
                  </p>
                )}
          </ul>
        )}
      </div>
    </div>
  );
}
