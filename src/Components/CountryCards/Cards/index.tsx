import Link from 'next/link';
import { CountryCardProps } from 'types/CountryTypes';
import styles from './styles.module.scss';

import Page from '../PageContainer';

import { useCountry } from '@contexts/CountryContext';

export default function Cards() {
  const { countries, isFiltering } = useCountry();

  function showData(value: string | number): string | number {
    if (typeof value === 'undefined') return 'None';

    if (typeof value === 'string') {
      return value !== '' ? value : 'None';
    }

    return new Intl.NumberFormat().format(value);
  }

  return (
    <>
      <div className={styles.cardsContainer}>
        {countries.map(
          ({ flag, name, capital, region, population }: CountryCardProps, key: number) => (
            <div key={key}>
              <div>
                <Link href={`/country/${name.toLowerCase()}`}>
                  <a>
                    <img src={flag} alt={name} title={name} />
                  </a>
                </Link>
              </div>

              <div>
                <Link href={`/country/${name.toLowerCase()}`}>
                  <a>
                    <h3>{showData(name)}</h3>
                  </a>
                </Link>

                <div>
                  <div>
                    Population: <span>{showData(population)}</span>
                  </div>

                  <div>
                    Region: <span>{showData(region)}</span>
                  </div>

                  <div>
                    Capital: <span>{showData(capital)}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {!isFiltering && <Page />}
    </>
  );
}
