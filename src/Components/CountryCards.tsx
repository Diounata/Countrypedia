import styles from '@Styles/CountryCards.module.scss';

export default function CountryCards({ data }) {
    return (
        <div className={styles.cardsContainer}>
            {data.map((country, key: number) => (
                <div key={key}>
                    <div>
                        <img src={country.flag} alt={country.name} title={country.name} />
                    </div>

                    <div>
                        <h3>{country.name}</h3>

                        <div>
                            <div>
                                Population: <span>{country.population}</span>
                            </div>

                            <div>
                                Region: <span>{country.region}</span>
                            </div>

                            <div>
                                Capital: <span>{country.capital}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
