import { GetStaticPaths } from 'next';
import { CountryProps } from '../../types/CountryTypes';

interface Props {
    country: CountryProps;
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{ params: { id: 'brazil' } }],
        fallback: 'blocking',
    };
};

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
    try {
        const fieldsFilter =
            'flag,name,nativeName,topLevelDomain,population,currencies,region,subregion,languages,capital,borders';
        const id = encodeURIComponent(params.id);

        const res = await fetch(`https://restcountries.com/v2/name/${id}?fields=${fieldsFilter}`);
        const data = await res.json();

        return {
            props: {
                country: data[0],
            },
        };
    } catch (err) {
        console.error(err);
    }
};

export default function CountryPage({ country }: Props) {
    return (
        <div>
            <div>
                <img src={country.flag} alt={country.name} title={country.name} />
            </div>

            <div>
                <h3>{country.name}</h3>

                <p>
                    Native name: <span>{country.nativeName}</span>
                </p>
            </div>
        </div>
    );
}
