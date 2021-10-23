import styles from '@Styles/Index.module.scss';

import Header from '@components/Header';
import Input from '@components/Input';
import Select from '@components/Select';
import CountryCards from '@components/CountryCards';

import SearchIcon from '@icons/Search';

import { useTheme } from '@contexts/ThemeContext';

interface CountryDataProps {
    flag: string;
    name: string;
    capital: string;
    region: string;
    population: number;
}

interface Props {
    data: CountryDataProps[];
}

export default function Home({ data }: Props) {
    const { theme } = useTheme();

    return (
        <div className={`container ${theme === 'light' ? 'light' : 'dark'}`}>
            <Header />

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

export async function getStaticProps() {
    const res = await fetch('https://restcountries.com/v2/all?fields=flag,name,population,region,capital');
    const initialData = await res.json();
    let data: CountryDataProps[] = [];

    for (let key = 0; key < 80; key++) {
        data.push(initialData[key]);
    }

    return {
        props: {
            data,
        },
    };
}
