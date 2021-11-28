import React, { useState, useEffect } from 'react';
import { Planet } from 'types';
import { getAllData } from 'utils';
import './style.scss';

const API_PLANETS_URL = 'https://swapi.dev/api/planets';

export default function Planets() {
  const [planets, setPlanets] = useState<Planet[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllData(API_PLANETS_URL);
        setPlanets(data);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='planets'>
      <header className=''>
        <h2>Search for a planet</h2>
      </header>
      <div className='planets__content flex-center'>
        <ul className='planets__content-cards'>
          {planets.map((planet: Planet) => (
            <li key={planet.name} className=''>
              <p>{planet.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
