import axios from 'axios';
import { Planet } from 'types';

export const getData = async (url: string) => {
  const response = await axios.get<Response<Planet>>(url);
  return response.data;
};

interface Response<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const getAllData = async (url: string): Promise<Planet[]> => {
  const planets: Planet[] = [];
  let urlNext: string | null = url;
  while (urlNext) {
    try {
      const result: Response<Planet> = await getData(urlNext);
      urlNext = result.next;
      planets.push(...result.results);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
  return Promise.resolve(planets);
};
