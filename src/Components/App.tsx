import { ReactNode } from 'react';

import Header from '@components/Header';

import { useTheme } from '@contexts/ThemeContext';

interface Props {
  children: ReactNode;
}

export default function App({ children }: Props) {
  const { theme } = useTheme();

  return (
    <div className={`container ${theme === 'light' ? 'light' : 'dark'}`}>
      <Header />

      {children}
    </div>
  );
}
