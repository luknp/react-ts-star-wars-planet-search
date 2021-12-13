import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import PlanetCard from './pages/Planets/components/PlanetCard';
import Planets from './pages/Planets';
import { planets } from '../__mocks__/planets';
import planetsResponse from '../__mocks__/planets-response.json';
import axios, { AxiosResponse } from 'axios';

jest.mock('axios');

afterEach(() => {
  jest.restoreAllMocks();
});

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedResponse = (data: any): AxiosResponse => {
  return {
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };
};

test('it renders App with header', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/search for a planet/i)).toBeInTheDocument();
  });
});

test('it renders PlanetCard with planet name', () => {
  render(<PlanetCard planet={planets[0]} />);
  const name = screen.getByText(/Tatooine/i);
  expect(name).toBeInTheDocument();
});

test('it displays a row for each planet', async () => {
  mockedAxios.get.mockResolvedValueOnce(mockedResponse(planetsResponse));
  render(<Planets />);
  const planetList = await waitFor(() => screen.findAllByTestId('planet-item'));
  expect(planetList).toHaveLength(10);
});

test('it displays a error info', async () => {
  mockedAxios.get.mockResolvedValueOnce(mockedResponse({}));
  render(<Planets />);
  const errorInfo = await waitFor(() => screen.getByTestId('error-info'));
  expect(errorInfo).toBeInTheDocument();
});

test('it finds a planet ', async () => {
  mockedAxios.get.mockResolvedValueOnce(mockedResponse(planetsResponse));
  render(<Planets />);
  const input = await waitFor(() => screen.getByLabelText('search-input'));
  fireEvent.change(input, { target: { value: 'Mirial' } });
  const planetList = await waitFor(() => screen.findAllByTestId('planet-item'));
  expect(planetList).toHaveLength(1);
});

test('it displays a information if it does not find the planet', async () => {
  mockedAxios.get.mockResolvedValueOnce(mockedResponse(planetsResponse));
  render(<Planets />);
  const input = await waitFor(() => screen.getByLabelText('search-input'));
  fireEvent.change(input, { target: { value: 'Unknown name' } });
  expect(screen.getByText(/No result for phrase/i)).toBeInTheDocument();
});
