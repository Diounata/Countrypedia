interface CurrenciesProps {
  code: string;
  name: string;
  symbol: string;
}

interface LanguagesProps {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

interface CountryCardProps {
  flag: string;
  name: string;
  capital: string;
  region: string;
  population: number;
}

interface CountryProps extends CountryCardProps {
  nativeName: string;
  topLevelDomain: string[];
  currencies: CurrenciesProps[];
  subregion: string;
  languages: LanguagesProps[];
  borders: string[];
}

export type { CountryCardProps, CountryProps, CurrenciesProps, LanguagesProps };
