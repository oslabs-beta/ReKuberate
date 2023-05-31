import React from 'react';
import { setExampleState } from '../store/appSlice';
import styles from './HomeContainerStyles.module.scss';

export default function HomeContainer() {
  function uploadFile(yamlFile: HTMLInputElement): void {
    fetch('/server', {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-yaml',
      },
      body: yamlFile.files[0],
    });
  }

  return (
    <div className={styles.yaml}>
      <div className={styles.fileborder}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            uploadFile(document.querySelector('#myFile') as HTMLInputElement);
          }}>
          <input type='file' id='myFile' name='filename' className={styles.fileInput}></input>
          <input type='submit' className={styles.button}></input>
        </form>
      </div>
    </div>
  );
}
