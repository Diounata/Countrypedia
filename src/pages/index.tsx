import Header from '@Components/Header';
import Input from '@Components/Input';
import Select from '@Components/Select';

import SearchIcon from '@Icons/Search';

import { useTheme } from '@Contexts/ThemeContext';

export default function Home() {
    const { theme } = useTheme();

    return (
        <div className={`container ${theme === 'light' ? 'light' : 'dark'}`}>
            <Header />

            <div className="content-container">
                <div className='input-container'>
                    <Input
                        InputProps={{ type: 'text', placeholder: 'Search for a country...' }}
                        labelId="search-country"
                    >
                        <SearchIcon color="var(--input)" />
                    </Input>

                    <Select />
                </div>
            </div>
        </div>
    );
}
