import { useEffect, useState } from 'react';
import { Planet } from 'types';

function useFilter(searchPhrase: string, data: Planet[]) {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const dataCloned = [...data];
    const filteredByStartWith = dataCloned.filter((planet, index) => {
      if (planet.name.toLowerCase().startsWith(searchPhrase.toLowerCase())) {
        dataCloned.splice(index, 1);
        return true;
      }
      return false;
    });

    const filteredBySubstring = dataCloned.filter((item: Planet) => {
      return item.name.toLowerCase().indexOf(searchPhrase.toLowerCase()) > -1;
    });
    setFilteredData([...filteredByStartWith, ...filteredBySubstring]);
  }, [searchPhrase, data]);

  return { filteredData };
}

export default useFilter;
