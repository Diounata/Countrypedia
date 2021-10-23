import { AppProps } from 'next/app';
import '@styles/main.scss';

import ThemeContextProvider from '@contexts/ThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeContextProvider>
            <div>
                <Component {...pageProps} />
            </div>
        </ThemeContextProvider>
    );
}
export default MyApp;
