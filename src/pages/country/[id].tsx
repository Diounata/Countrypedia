import Link from 'next/link';
import { GetStaticPaths } from 'next';
import { CountryProps } from 'types/CountryTypes';
import styles from '@styles/CountryPage.module.scss';

import CountryData from '@components/CountryPage/CountryData';
import Button from '@components/Button';

import { BsArrowLeft } from 'react-icons/bs';

interface Props {
  country: CountryProps;
}

export default function CountryPage({ country }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Link href="/">
          <a>
            <Button>
              <>
                <BsArrowLeft /> <span>Back</span>
              </>
            </Button>
          </a>
        </Link>
      </div>

      <div className={styles.countryContainer}>
        <div className={styles.imgContainer}>
          <img src={country.flag} alt={country.name} title={country.name} />
        </div>

        <CountryData countryData={country} />
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'brazil' } }],
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  try {
    const api = 'https://restcountries.com/v2';
    const fields =
      'flag,name,nativeName,topLevelDomain,population,currencies,region,subregion,languages,capital,borders';
    const id = encodeURIComponent(params.id);

    const res = await fetch(`${api}/name/${id}?fields=${fields}`);
    const [data]: CountryProps[] = await res.json();

    const borders: string[] = await Promise.all(
      data.borders.map(country => fetch(`${api}/alpha/${country}?fields=name`))
    )
      .then(res => Promise.all(res.map(res => res.json())))
      .then(data => data.map(element => element.name));

    if (!data) {
      throw 'Err';
    }

    return {
      props: {
        country: { ...data, borders },
      },
    };
  } catch (err) {
    console.error(err);

    return {
      notFound: true,
    };
  }
};
