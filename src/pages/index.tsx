import Header from '@Components/Header';
import Input from '@Components/Input';
import Select from '@Components/Select';
import CountryCards from '@Components/CountryCards';

import SearchIcon from '@Icons/Search';

import { useTheme } from '@Contexts/ThemeContext';

export default function Home({ data }) {
    const { theme } = useTheme();

    return (
        <div className={`container ${theme === 'light' ? 'light' : 'dark'}`}>
            <Header />

            <div className="content-container">
                <div className="input-container">
                    <Input
                        InputProps={{ type: 'text', placeholder: 'Search for a country...' }}
                        labelId="search-country"
                    >
                        <SearchIcon color="var(--input)" />
                    </Input>

                    <Select />
                </div>

                <CountryCards data={data} />
            </div>
        </div>
    );
}

export async function getStaticProps(context) {
    const res = await fetch('https://restcountries.com/v2/all');
    const initialData = await res.json();
    let data = [];

    for (let key = 0; key < 30; key++) {
        data.push(initialData[key]);
    }

    return {
        props: {
            data,
        },
    };
}
