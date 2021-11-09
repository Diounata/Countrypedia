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
  currentCountryPage: number;
  regionFilter: FilterProps;
  searchFilter: string;
  isFiltering: boolean;
  cardComponentSituation: CardComponentSituationProps;

  updateAllCountries(value: CountryCardProps[]): void;
  updateCountries(value: CountryCardProps[]): void;
  updateCurrentCountryPage(page: number): void;
  updateRegionFilter(value: FilterProps): void;
  updateSearchFilter(value: string): void;
  resetFilters(): void;
}

export function CountryProvider({ children }: ChildrenProps) {
  const [allCountries, setAllCountries] = useState<CountryCardProps[]>([]);
  const [countries, setCountries] = useState<CountryCardProps[]>([]);
  const [currentCountryPage, setCurrentCountryPage] = useState(1);
  const [regionFilter, setRegionFilter] = useState<FilterProps>('None');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isFiltering, setIsFiltering] = useState(false);
  const [isFilteringByRegion, setIsFilteringByRegion] = useState(true);
  const [lastSearchFilterLength, setLastSearchFilterLength] = useState(0);
  const [cardComponentSituation, setCardComponentSituation] = useState<CardComponentSituationProps>('Found');

  function updateAllCountries(value: CountryCardProps[]): void {
    setAllCountries(value);
  }

  function updateCountries(value: CountryCardProps[]): void {
    const firstCountry = (currentCountryPage - 1) * 23;
    const lastCountry = firstCountry + 23;

    let newCountries = value.filter((element, key) => key >= firstCountry && key <= lastCountry);

    setCountries(newCountries);
  }

  function updateCurrentCountryPage(page: number): void {
    setCurrentCountryPage(page);
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

      setCountries(newCountries);
    }
  }

  function filterCountriesBySearching(): void {
    const filteredCountries = allCountries.filter(element =>
      element.name.toLowerCase().includes(searchFilter.toLowerCase())
    );

    if (filteredCountries && lastSearchFilterLength >= 3) setCardComponentSituation('Found');

    if (filteredCountries.length !== 0) setCountries(filteredCountries);
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

  useEffect(() => {
    updateCountries(allCountries);
  }, [currentCountryPage]);

  useEffect(() => {
    if (regionFilter !== 'None' || searchFilter.length >= 3) setIsFiltering(true);
    else setIsFiltering(false);
  }, [regionFilter, searchFilter]);

  return (
    <CountryContext.Provider
      value={{
        countries,
        currentCountryPage,
        regionFilter,
        searchFilter,
        isFiltering,
        cardComponentSituation,
        updateAllCountries,
        updateCurrentCountryPage,
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
