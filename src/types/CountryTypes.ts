interface CurrenciesProps {
    code: string;
    name: string;
    symbol: string;
}

interface LanguageProps {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
}

interface CountryProps {
    flag: string;
    name: string;
    nativeName: string;
    topLevelDomain: string[];
    population: number;
    currencies: CurrenciesProps[];
    region: string;
    subregion: string;
    languages: LanguageProps;
    capital: string;
    borders: string[];
}

export type { CountryProps };
