import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { CountryCardProps } from 'types/CountryTypes';
import { FilterProps } from 'types/FilterTypes';

const CountryContext = createContext({} as ContextProps);

interface ChildrenProps {
  children: ReactNode;
}

interface ContextProps {
  countries: CountryCardProps[];
  regionFilter: FilterProps;
  updateAllCountries(value: CountryCardProps[]): void;
  updateCountries(value: CountryCardProps[]): void;
  updateRegionFilter(value: FilterProps): void;
}

export function CountryProvider({ children }: ChildrenProps) {
  const [allCountries, setAllCountries] = useState<CountryCardProps[]>([]);
  const [countries, setCountries] = useState<CountryCardProps[]>([]);
  const [regionFilter, setRegionFilter] = useState<FilterProps>('None');

  function updateAllCountries(value: CountryCardProps[]): void {
    setAllCountries(value);
  }

  function updateCountries(value: CountryCardProps[]): void {
    let newCountries = value.filter((element, key) => key < 30);

    setCountries(newCountries);
  }

  function updateRegionFilter(value: FilterProps) {
    if (value === regionFilter) setRegionFilter('None');
    else setRegionFilter(value);
  }

  function filterCountriesByRegion(): void {
    if (regionFilter === 'None') updateCountries(allCountries);
    else {
      const newCountries: CountryCardProps[] = allCountries.filter(country => country.region === regionFilter);

      updateCountries(newCountries);
    }
  }

  useEffect(() => filterCountriesByRegion(), [regionFilter]);
  useEffect(() => updateCountries(allCountries), []);

  return (
    <CountryContext.Provider
      value={{ countries, regionFilter, updateAllCountries, updateCountries, updateRegionFilter }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  return useContext(CountryContext);
}
