import { ReactNode } from 'react';
import { IconContext } from 'react-icons';

import Header from '@components/Header';

import { useTheme } from '@contexts/ThemeContext';

interface Props {
  children: ReactNode;
}

export default function App({ children }: Props) {
  const { theme } = useTheme();

  return (
    <IconContext.Provider
      value={{ color: theme === 'light' ? '#111517' : '#ffffff', className: 'global-class-name' }}
    >
      <div className={`container ${theme === 'light' ? 'light' : 'dark'}`}>
        <Header />

        {children}
      </div>
    </IconContext.Provider>
  );
}
