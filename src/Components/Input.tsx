import { InputHTMLAttributes, ReactNode } from 'react';
import styles from '@Styles/Input.module.scss';

interface Props {
    children: ReactNode;
    labelId: string;
    InputProps: InputHTMLAttributes<HTMLInputElement>;
}

export default function Input({ children, labelId, InputProps }: Props) {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={labelId}> {children} </label>

            <input {...InputProps} id={labelId} />
        </div>
    );
}
