import Cards from './Cards';
import NotFound from './NotFound';

import { useCountry } from '@contexts/CountryContext';

export default function CountryCards() {
  const { currentComponentCard } = useCountry();

  const CardComponent = {
    Cards: <Cards />,
    NotFound: <NotFound />,
  };

  return <>{CardComponent[currentComponentCard]}</>;
}
