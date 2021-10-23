import { AppProps } from 'next/app';
import '@styles/main.scss';

import Header from '@components/Header';

import ThemeContextProvider from '@contexts/ThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <Header />

      <div>
        <Component {...pageProps} />
      </div>
    </ThemeContextProvider>
  );
}
export default MyApp;
