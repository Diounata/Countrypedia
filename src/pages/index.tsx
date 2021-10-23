import { GetStaticProps } from 'next';
import styles from '@Styles/Index.module.scss';

import Input from '@components/Input';
import Select from '@components/Select';
import CountryCards from '@components/CountryCards';

import SearchIcon from '@icons/Search';
import { CountryCardProps } from '../types/CountryTypes';

import { useTheme } from '@contexts/ThemeContext';

interface Props {
  data: CountryCardProps[];
}

export default function Home({ data }: Props) {
  const { theme } = useTheme();

  return (
    <div className={`container ${theme === 'light' ? 'light' : 'dark'}`}>
      <div className={styles.contentContainer}>
        <div className={styles.inputContainer}>
          <Input
            InputProps={{ type: 'text', placeholder: 'Search for a country...' }}
            labelId="search-country"
          >
            <SearchIcon color="var(--input)" />
          </Input>

          <Select />
        </div>

        <div className={styles.cardsContainer}>
          <CountryCards data={data} />
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch('https://restcountries.com/v2/all?fields=flag,name,population,region,capital');
    const initialData = await res.json();
    const data: CountryCardProps[] = initialData.filter((element: CountryCardProps, key: number) => key < 80);

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
