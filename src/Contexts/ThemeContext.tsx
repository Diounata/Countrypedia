import { createContext, ReactNode, useContext, useState } from 'react';

export const ThemeContext = createContext({} as ContextProps);

interface ChildrenProps {
  children: ReactNode;
}

type ThemeProps = 'light' | 'dark';

interface ContextProps {
  theme: ThemeProps;
  toggleTheme(): void;
}

export function ThemeProvider({ children }: ChildrenProps) {
  const [theme, setTheme] = useState<ThemeProps>('light');

  function toggleTheme(): void {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
