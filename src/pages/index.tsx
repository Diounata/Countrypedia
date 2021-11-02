import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import styles from '@styles/Index.module.scss';

import Input from '@components/Input';
import Select from '@components/Select';
import CountryCards from '@components/CountryCards';
import Title from '@utils/PageTitle';
import Favicon from '@utils/Favicon';

import SearchIcon from '@icons/Search';

import { useCountry } from '@contexts/CountryContext';
import { CountryCardProps } from 'types/CountryTypes';

interface Props {
  data: CountryCardProps[];
}

export default function Home({ data }: Props) {
  const { updateAllCountries } = useCountry();

  useEffect(() => updateAllCountries(data), []);

  return (
    <div className={styles.contentContainer}>
      <Title text="Country.data" />
      <Favicon faviconUrl="./favicon.ico" />

      <div className={styles.inputContainer}>
        <Input InputProps={{ type: 'text', placeholder: 'Search for a country...' }} labelId="search-country">
          <SearchIcon color="var(--input)" />
        </Input>

        <Select />
      </div>

      <div className={styles.cardsContainer}>
        <CountryCards />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch('https://restcountries.com/v2/all?fields=flag,name,population,region,capital');
    const data = await res.json();

    return {
      props: {
        data,
      },
    };
  } catch (err) {
    console.error(err);

    return {
      notFound: true,
    };
  }
};
