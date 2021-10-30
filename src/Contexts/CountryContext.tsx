import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { CountryCardProps } from 'types/CountryTypes';
import { FilterProps } from 'types/FilterTypes';

const CountryContext = createContext({} as ContextProps);

type CurrentCardComponentProps = 'Cards' | 'NotFound';

interface ChildrenProps {
  children: ReactNode;
}

interface ContextProps {
  countries: CountryCardProps[];
  regionFilter: FilterProps;
  searchFilter: string;
  currentComponentCard: CurrentCardComponentProps;

  updateAllCountries(value: CountryCardProps[]): void;
  updateCountries(value: CountryCardProps[]): void;
  updateRegionFilter(value: FilterProps): void;
  updateSearchFilter(value: string): void;
}

export function CountryProvider({ children }: ChildrenProps) {
  const [allCountries, setAllCountries] = useState<CountryCardProps[]>([]);
  const [countries, setCountries] = useState<CountryCardProps[]>([]);
  const [regionFilter, setRegionFilter] = useState<FilterProps>('None');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [lastSearchFilterLength, setLastSearchFilterLength] = useState(0);
  const [currentComponentCard, setCurrentComponentCard] = useState<CurrentCardComponentProps>('Cards');

  function updateAllCountries(value: CountryCardProps[]): void {
    setAllCountries(value);
  }

  function updateCountries(value: CountryCardProps[]): void {
    let newCountries = value.filter((element, key) => key < 50);

    setCountries(newCountries);
  }

  function updateRegionFilter(value: FilterProps) {
    if (value === regionFilter) setRegionFilter('None');
    else setRegionFilter(value);
  }

  function updateSearchFilter(value: string): void {
    setLastSearchFilterLength(searchFilter.length);
    setSearchFilter(value);
  }

  function filterCountriesByRegion(): void {
    if (regionFilter === 'None') updateCountries(allCountries);
    else {
      const newCountries: CountryCardProps[] = allCountries.filter(
        country => country.region === regionFilter
      );

      updateCountries(newCountries);
    }
  }

  function filterCountries(): void {
    const filteredCountries = allCountries.filter(element =>
      element.name.toLowerCase().includes(searchFilter.toLowerCase())
    );

    if (filteredCountries.length !== 0) updateCountries(filteredCountries);
    else setCurrentComponentCard('NotFound');
  }

  useEffect(() => filterCountriesByRegion(), [regionFilter]);
  useEffect(() => updateCountries(allCountries), [allCountries]);

  useEffect(() => {
    if (searchFilter.length >= 3) {
      filterCountries();
      return;
    }

    if (lastSearchFilterLength >= 3 && searchFilter.length < 3) {
      setCurrentComponentCard('Cards');
      updateCountries(allCountries);
    }
  }, [searchFilter]);

  return (
    <CountryContext.Provider
      value={{
        countries,
        regionFilter,
        searchFilter,
        currentComponentCard,
        updateAllCountries,
        updateCountries,
        updateRegionFilter,
        updateSearchFilter,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  return useContext(CountryContext);
}
