import { HTMLProps, ReactNode } from 'react';
import styles from './styles.module.scss';

export default function Button(props: HTMLProps<HTMLButtonElement>) {
  return (
    <button {...props} className={styles.buttonContainer} type="button">
      {props.children}
    </button>
  );
}
