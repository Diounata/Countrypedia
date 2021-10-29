import { AppProps } from 'next/app';
import '@styles/main.scss';

import App from '@components/App';

import { ThemeProvider } from '@contexts/ThemeContext';
import { CountryProvider } from '@contexts/CountryContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <CountryProvider>
        
        <div>
          <App>
            <Component {...pageProps} />
          </App>
        </div>

      </CountryProvider>
    </ThemeProvider>
  );
}
export default MyApp;
