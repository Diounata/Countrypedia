import { InputHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.scss';

import { useCountry } from '@contexts/CountryContext';

interface Props {
  children: ReactNode;
  labelId: string;
  InputProps: InputHTMLAttributes<HTMLInputElement>;
}

export default function Input({ children, labelId, InputProps }: Props) {
  const { searchFilter, updateSearchFilter } = useCountry();

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={labelId}> {children} </label>

      <input
        {...InputProps}
        id={labelId}
        onChange={e => updateSearchFilter(e.target.value)}
        value={searchFilter}
      />
    </div>
  );
}
