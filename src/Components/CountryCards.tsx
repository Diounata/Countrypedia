import Link from 'next/link';
import styles from '@Styles/CountryCards.module.scss';

interface CountryDataProps {
    flag: string;
    name: string;
    capital: string;
    region: string;
    population: number;
}

interface Props {
    data: CountryDataProps[];
}

export default function CountryCards({ data }: Props) {
    function showData(value: string | number): string | number {
        if (typeof value === 'string') {
            return value !== '' ? value : 'Unexistent';
        }

        return new Intl.NumberFormat().format(value);
    }

    return (
        <div className={styles.cardsContainer}>
            {data.map(({ flag, name, capital, region, population }: CountryDataProps, key: number) => (
                <div key={key}>
                    <div>
                        <Link href={`/country/${name}`}>
                            <a>
                                <img src={flag} alt={name} title={name} />
                            </a>
                        </Link>
                    </div>

                    <div>
                        <h3>{showData(name)}</h3>

                        <div>
                            <div>
                                Population: <span>{showData(population)}</span>
                            </div>

                            <div>
                                Region: <span>{showData(region)}</span>
                            </div>

                            <div>
                                Capital: <span>{showData(capital)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
