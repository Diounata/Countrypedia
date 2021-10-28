import Link from 'next/link';
import Button from '@components/Button';

import { CurrenciesProps, LanguagesProps } from 'types/CountryTypes';

type ObjectProps = CurrenciesProps | LanguagesProps;

interface Props {
  getData(data: any): string;
  formatNumber(num: number): string;
  formatArrayToString(stringArr: string[]): string;
  formatObjectToString(value: ObjectProps[]): string;
  getBorderCountriesButton(borders: string[]): JSX.Element;
}

export function useCountry(): Props {
  function getData(data: any): string {
    return data || 'none';
  }

  function formatNumber(num: number): string {
    return new Intl.NumberFormat().format(num);
  }

  function formatArrayToString(stringArr: string[]): string {
    const arrLength = stringArr.length;
    let dataString = '';

    stringArr.forEach((element: string, key: number) => {
      const string = key + 1 === arrLength ? `${element}` : `${element}, `;

      dataString += string;
    });

    return dataString;
  }

  function formatObjectToString(value: ObjectProps[]): string {
    const string = value.map((element: ObjectProps) => element.name);

    return formatArrayToString(string);
  }

  function getBorderCountriesButton(borders: string[]): JSX.Element {
    if (!borders.length) {
      return <span>None</span>;
    }

    return (
      <>
        {borders.map((country, key) => (
          <Link href={`/country/${country}`} key={key}>
            <a>
              <Button>{country}</Button>
            </a>
          </Link>
        ))}
      </>
    );
  }

  return {
    getData,
    formatNumber,
    formatArrayToString,
    formatObjectToString,
    getBorderCountriesButton,
  };
}
