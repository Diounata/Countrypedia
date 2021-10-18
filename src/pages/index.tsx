import Header from '@Components/Header';
import { useTheme } from '@Contexts/ThemeContext';

export default function Home() {
    const { theme } = useTheme();

    return (
        <div className={`container ${theme === 'light' ? 'light' : 'dark'}`}>
            <Header />

            <div className="content-container"></div>
        </div>
    );
}
