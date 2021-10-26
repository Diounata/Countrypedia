import { useState } from 'react';
import styles from './styles.module.scss';

import ArrowDownIcon from '@icons/DownArrow';
import LeftArrowIcon from '@icons/LeftArrow';

type OptionProps = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

export default function Select() {
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<OptionProps>();

    const options: OptionProps[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

    return (
        <div className={styles.selectContainer}>
            <div className={styles.selectTitle} onClick={() => setIsSelectOpen(!isSelectOpen)}>
                <div>Filter by Region</div>

                <ArrowDownIcon />
            </div>

            <div className={styles.selectOptions} style={{ display: isSelectOpen ? 'flex' : 'none' }}>
                {options.map((element: OptionProps, key: number) => (
                    <div key={key} onClick={() => setSelectedOption(element)}>
                        <div>{element}</div> {selectedOption === element && <LeftArrowIcon />}
                    </div>
                ))}
            </div>
        </div>
    );
}
