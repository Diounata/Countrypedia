import { AppProps } from 'next/app';
import '@styles/main.scss';

import App from '@components/App';

import { ThemeProvider } from '@contexts/ThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div>
        
        <App>
          <Component {...pageProps} />
        </App>
        
      </div>
    </ThemeProvider>
  );
}
export default MyApp;
