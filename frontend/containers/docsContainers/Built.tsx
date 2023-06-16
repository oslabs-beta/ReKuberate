import React from 'react';
import styles from './DocsStyles.module.scss';

export default function Built() {
  return (
    <>
      <div className={styles.docs} id="built">
        <a className={styles.kai} id='kai'>Kai Farrell</a>
        <a className={styles.hunter}>Hunter Shaw</a>
        <a className={styles.thad}>Thad White</a>
        <a className={styles.fabrizzio}>Fabrizzio Quintanilla</a>
        <a href="https://kfan1.github.io/cv/" className={styles.kevin}>
          Kevin Fan
        </a>
      </div>
    </>
  );
}
