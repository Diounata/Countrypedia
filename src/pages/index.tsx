import styles from '@Styles/Index.module.scss';

import Header from '@Components/Header';
import Input from '@Components/Input';
import Select from '@Components/Select';
import CountryCards from '@Components/CountryCards';

import SearchIcon from '@Icons/Search';

import { useTheme } from '@Contexts/ThemeContext';

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
