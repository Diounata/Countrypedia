import styles from './styles.module.scss';

import { CountryProps } from 'types/CountryTypes';
import { useCountryData } from '../useCountryData';

interface Props {
  countryData: CountryProps;
}

export default function CountryData({ countryData }: Props) {
  const { getData, formatNumber, formatArrayToString, formatObjectToString, getBorderCountriesButton } = useCountryData();
  const { name, capital, languages, population, region, subregion, currencies, nativeName, topLevelDomain, borders } = countryData;

  return (
    <div className={styles.container}>
      <h2>{name}</h2>

      <div>
        <div>
          <h5>
            Native name: <span>{getData(nativeName)}</span>
          </h5>

          <h5>
            Population: <span>{formatNumber(population)}</span>
          </h5>

          <h5>
            Region: <span>{getData(region)}</span>
          </h5>

          <h5>
            Sub Region: <span>{getData(subregion)}</span>
          </h5>

          <h5>
            Capital: <span>{getData(capital)}</span>
          </h5>
        </div>

        <div>
          <h5>
            Top Level Domain: <span>{formatArrayToString(topLevelDomain)}</span>
          </h5>

          <h5>
            Currencies: <span>{formatObjectToString(currencies)}</span>
          </h5>

          <h5>
            Languages: <span>{formatObjectToString(languages)}</span>
          </h5>
        </div>
      </div>

      <div className={styles.borderCountriesContainer}>
        <h5>Border Countries:</h5>

        <div>{getBorderCountriesButton(borders)}</div>
      </div>
    </div>
  );
}
