import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { CountryCardProps } from 'types/CountryTypes';
import { FilterProps } from 'types/FilterTypes';

const CountryContext = createContext({} as ContextProps);

type CardComponentSituationProps = 'Found' | 'NotFound';

interface ChildrenProps {
  children: ReactNode;
}

interface ContextProps {
  countries: CountryCardProps[];
  regionFilter: FilterProps;
  searchFilter: string;
  cardComponentSituation: CardComponentSituationProps;

  updateAllCountries(value: CountryCardProps[]): void;
  updateCountries(value: CountryCardProps[]): void;
  updateRegionFilter(value: FilterProps): void;
  updateSearchFilter(value: string): void;
  resetFilters(): void;
}

export function CountryProvider({ children }: ChildrenProps) {
  const [allCountries, setAllCountries] = useState<CountryCardProps[]>([]);
  const [countries, setCountries] = useState<CountryCardProps[]>([]);
  const [regionFilter, setRegionFilter] = useState<FilterProps>('None');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isFilteringByRegion, setIsFilteringByRegion] = useState(true);
  const [lastSearchFilterLength, setLastSearchFilterLength] = useState(0);
  const [cardComponentSituation, setCardComponentSituation] = useState<CardComponentSituationProps>('Found');

  function updateAllCountries(value: CountryCardProps[]): void {
    setAllCountries(value);
  }

  function updateCountries(value: CountryCardProps[]): void {
    let newCountries = value.filter((element, key) => key < 50);

    setCountries(newCountries);
  }

  function updateRegionFilter(value: FilterProps): void {
    setIsFilteringByRegion(true);

    if (value === regionFilter) setRegionFilter('None');
    else setRegionFilter(value);
  }

  function updateSearchFilter(value: string): void {
    setLastSearchFilterLength(searchFilter.length);
    setSearchFilter(value);
  }

  function filterCountriesByRegion(): void {
    if (cardComponentSituation === 'NotFound') setCardComponentSituation('Found');

    if (regionFilter === 'None') updateCountries(allCountries);
    else {
      const newCountries: CountryCardProps[] = allCountries.filter(
        country => country.region === regionFilter
      );

      updateCountries(newCountries);
    }
  }

  function filterCountriesBySearching(): void {
    const filteredCountries = allCountries.filter(element =>
      element.name.toLowerCase().includes(searchFilter.toLowerCase())
    );

    if (filteredCountries && lastSearchFilterLength >= 3) setCardComponentSituation('Found');

    if (filteredCountries.length !== 0) updateCountries(filteredCountries);
    else setCardComponentSituation('NotFound');
  }

  function resetFilters(): void {
    setRegionFilter('None');
    setLastSearchFilterLength(0);
  }

  useEffect(() => updateCountries(allCountries), [allCountries]);

  useEffect(() => {
    if (isFilteringByRegion) {
      filterCountriesByRegion();
      setSearchFilter('');
      setIsFilteringByRegion(false);
    }
  }, [regionFilter]);

  useEffect(() => {
    const searchFilterLength = searchFilter.length;

    if (searchFilterLength >= 3) {
      if (regionFilter !== 'None') setRegionFilter('None');

      filterCountriesBySearching();
      return;
    }

    if (lastSearchFilterLength >= 3 && searchFilterLength < 3) {
      updateCountries(allCountries);
      setCardComponentSituation('Found');
    }
  }, [searchFilter]);

  return (
    <CountryContext.Provider
      value={{
        countries,
        regionFilter,
        searchFilter,
        cardComponentSituation,
        updateAllCountries,
        updateCountries,
        updateRegionFilter,
        updateSearchFilter,
        resetFilters,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  return useContext(CountryContext);
}
