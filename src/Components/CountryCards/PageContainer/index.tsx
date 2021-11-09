import styles from './styles.module.scss';

import PreviousIcon from '@icons/Previous';
import NextIcon from '@icons/Next';

import Button from '@components/Button';

import { useCountry } from '@contexts/CountryContext';

export default function Page() {
  const { currentCountryPage, updateCurrentCountryPage } = useCountry();

  function getButtonState(button: 'prev' | 'next'): boolean {
    const page = currentCountryPage;

    if ((button === 'prev' && page === 1) || (button === 'next' && page === 11)) return true;
    else return false;
  }

  return (
    <div className={styles.container}>
      <Button
        onClick={() => updateCurrentCountryPage(currentCountryPage - 1)}
        disabled={getButtonState('prev')}
      >
        <PreviousIcon /> <span>Prev</span>
      </Button>

      <div>Page {currentCountryPage} of 11</div>

      <Button
        onClick={() => updateCurrentCountryPage(currentCountryPage + 1)}
        disabled={getButtonState('next')}
      >
        <span>Next</span> <NextIcon />
      </Button>
    </div>
  );
}
