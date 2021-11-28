import { Planet } from 'types';

async function getData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = (await response.json()) as T;
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

interface Response<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const getAllData = async (url: string): Promise<Planet[]> => {
  const arr: Planet[] = [];
  let urlNext: string | null = url;
  while (urlNext) {
    try {
      const result: Response<Planet> = await getData<Response<Planet>>(urlNext);
      urlNext = result.next;
      arr.push(...result.results);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
  return Promise.resolve(arr);
};
