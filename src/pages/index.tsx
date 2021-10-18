import Header from '@Components/Header';
import Input from '@Components/Input';

import { useTheme } from '@Contexts/ThemeContext';
import SearchIcon from '@Icons/Search';

export default function Home() {
    const { theme } = useTheme();

    return (
        <div className={`container ${theme === 'light' ? 'light' : 'dark'}`}>
            <Header />

            <div className="content-container">
                <Input
                    InputProps={{ type: 'text', placeholder: 'Search for a country...' }}
                    labelId="search-country"
                >
                    <SearchIcon color='var(--input) '/>
                </Input>
            </div>
        </div>
    );
}
