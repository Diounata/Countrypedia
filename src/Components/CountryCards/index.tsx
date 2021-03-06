import Cards from './Cards';
import NotFound from './NotFound';

import { useCountry } from '@contexts/CountryContext';

export default function CountryCards() {
  const { cardComponentSituation } = useCountry();

  const CardComponent = {
    Found: <Cards />,
    NotFound: <NotFound />,
  };

  return <>{CardComponent[cardComponentSituation]}</>;
}
