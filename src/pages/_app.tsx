import '@Styles/main.scss';

import ThemeContextProvider from '@Contexts/ThemeContext';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeContextProvider>

            <div>
                <Component {...pageProps} />
            </div>

        </ThemeContextProvider>
    );
}

export default MyApp;
