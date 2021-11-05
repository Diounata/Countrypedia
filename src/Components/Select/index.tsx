import { useState } from 'react';
import styles from './styles.module.scss';

import ArrowDownIcon from '@icons/DownArrow';
import LeftArrowIcon from '@icons/LeftArrow';

import { FilterProps } from 'types/FilterTypes';

import { useCountry } from '@contexts/CountryContext';

export default function Select() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const { regionFilter, updateRegionFilter  } = useCountry();

  const options: FilterProps[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  function getSelectTitle(): string {
    return regionFilter === 'None' ? 'Filter by Region' : regionFilter;
  }

  return (
    <div className={styles.selectContainer}>
      <div onClick={() => setIsSelectOpen(!isSelectOpen)} className={styles.selectTitle}>
        <div>{getSelectTitle()}</div> <ArrowDownIcon />
      </div>

      <div style={{ display: isSelectOpen ? 'flex' : 'none' }} className={styles.selectOptions}>
        {options.map((element: FilterProps, key: number) => (
          <div onClick={() => updateRegionFilter(element)} key={key}>
            <div>{element}</div> {regionFilter === element && <LeftArrowIcon />}
          </div>
        ))}
      </div>
    </div>
  );
}
