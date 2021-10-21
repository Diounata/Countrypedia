import { GetStaticPaths } from 'next';
import { CountryProps } from '../../types/CountryTypes';

interface StaticProps {
    params: { id: string };
}

interface Props {
    country: CountryProps;
}

export default function CountryPage({ country }: Props) {
    return (
        <div>
            <img src={country.flag} />
            <div>{country.name}</div>
            test
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{ params: { id: 'Brazil' } }],
        fallback: 'blocking',
    };
};

export const getStaticProps = async ({ params }: StaticProps) => {
    const fieldsFilter = 'flag,name,nativeName,topLevelDomain,population,currencies,region,subregion,languages,capital,borders';
    const { id } = params;

    const res = await fetch(`https://restcountries.com/v2/name/${id}?fields=${fieldsFilter}`);
    const data = await res.json();

    return {
        props: {
            country: data,
        },
    };
};
