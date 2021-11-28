import { useEffect, useState } from 'react';
import { Planet } from 'types';

function useFilter(searchPhrase: string, data: Planet[]) {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filteredPlanets = data.filter((item: Planet) => {
      return item.name.toLowerCase().indexOf(searchPhrase.toLowerCase()) > -1;
    });

    setFilteredData(filteredPlanets);
  }, [searchPhrase, data]);

  return { filteredData };
}

export default useFilter;
