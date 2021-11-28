import React from 'react';
import { Planet } from 'types';
import './style.scss';

type Props = {
  planet: Planet;
};

export default function PlanetCard({ planet }: Props) {
  const column1Keys: Array<keyof Planet> = ['climate', 'terrain', 'gravity', 'created'];
  const column2Keys: Array<keyof Planet> = ['diameter', 'population', 'orbital_period', 'rotation_period'];

  const keyValueUI = (key: keyof Planet, value: string | string[]) => {
    let valueToShow = value;
    if (Array.isArray(value)) {
      valueToShow = `${value[0]} ...`;
    }
    return (
      <div key={key} className='property'>
        {key}: <span className='value'>{valueToShow}</span>
      </div>
    );
  };

  return (
    <div className='planet'>
      <h4 className='planet__name'>{planet.name}</h4>
      <section className='planet__info'>
        <div>{column1Keys.map(key => keyValueUI(key, planet[key]))}</div>
        <div className='separator'></div>
        <div>{column2Keys.map(key => keyValueUI(key, planet[key]))}</div>
      </section>
      <div className='planet__read-more' onClick={() => alert(`Not implemented yet 🙁`)}>
        <span>Read more</span>
        <svg className='icon' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8l4 4m0 0l-4 4m4-4H3' />
        </svg>
      </div>
    </div>
  );
}
