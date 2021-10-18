import styles from '@Styles/Header.module.scss';

import MoonIcon from '@Icons/Moon';
import FilledMoonIcon from '@Icons/FilledMoon';

import { useTheme } from '@Contexts/ThemeContext';

export default function Header() {
    const { theme, toggleTheme } = useTheme();

    const icon = { light: <MoonIcon />, dark: <FilledMoonIcon /> };

    return (
        <header className={styles.headerContainer}>
            <h3>Where in the world?</h3>

            <button title='Toggle theme' onClick={toggleTheme}>
                {icon[theme]}

                Dark Mode
            </button>
        </header>
    );
}
