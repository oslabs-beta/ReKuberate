import React from 'react';
import styles from './DocsStyles.module.scss';

export default function Built() {
  return (
    <>
      <div className={styles.docs} id="built">
        <a href="https://www.linkedin.com/in/kaifarrell/" className={styles.kai} id='kai'>Kai Farrell</a>
        <a href="https://www.linkedin.com/in/hshaw215/" className={styles.hunter}>Hunter Shaw</a>
        <a href="https://www.linkedin.com/in/thad-white/" className={styles.thad}>Thad White</a>
        <a href="https://www.linkedin.com/in/fabrizzio-quintanilla-b58388244/" className={styles.fabrizzio}>Fabrizzio Quintanilla</a>
        <a href="https://kfan1.github.io/cv/" className={styles.kevin}>
          Kevin Fan
        </a>
      </div>
    </>
  );
}
