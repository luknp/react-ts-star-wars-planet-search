import { Planet } from 'types';
import { useEffect, useReducer } from 'react';
import { getAllData } from 'utils';

export enum FetchStatus {
  Idle,
  Loading,
  Fetched,
  Error,
}

interface State {
  data: Planet[];
  error?: Error;
  status: FetchStatus;
}

type Action =
  | { type: FetchStatus.Loading }
  | { type: FetchStatus.Fetched; payload: Planet[] }
  | { type: FetchStatus.Error; payload: Error };

function useFetchPlanets(initUrl: string): State {
  const initialState: State = {
    error: undefined,
    data: [],
    status: FetchStatus.Idle,
  };

  const fetchReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case FetchStatus.Loading:
        return { ...initialState, status: FetchStatus.Loading };
      case FetchStatus.Fetched:
        return { ...initialState, data: action.payload, status: FetchStatus.Fetched };
      case FetchStatus.Error:
        return { ...initialState, error: action.payload, status: FetchStatus.Error };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchData = async () => {
    dispatch({ type: FetchStatus.Loading });
    try {
      const data = await getAllData(initUrl);
      dispatch({ type: FetchStatus.Fetched, payload: data });
    } catch (error) {
      dispatch({ type: FetchStatus.Error, payload: error as Error });
    }
  };

  useEffect(() => {
    fetchData();
  }, [initUrl]);

  return state;
}

export default useFetchPlanets;
