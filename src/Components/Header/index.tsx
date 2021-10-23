import styles from './styles.module.scss';

import MoonIcon from '@icons/Moon';
import FilledMoonIcon from '@icons/FilledMoon';

import { useTheme } from '@contexts/ThemeContext';

export default function Header() {
    const { theme, toggleTheme } = useTheme();

    const icon = { light: <MoonIcon />, dark: <FilledMoonIcon /> };

    return (
        <header className={styles.headerContainer}>
            <h3>Where in the world?</h3>

            <button title="Toggle theme" onClick={toggleTheme}>
                {icon[theme]}
                Dark Mode
            </button>
        </header>
    );
}
