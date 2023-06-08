import React, { useEffect } from 'react';
import styles from './HomeContainerStyles.module.scss';
import { useAppDispatch } from '../store/hooks';
import { setData, setURLs } from '../store/appSlice';
import { useNavigate } from 'react-router-dom';

export default function HomeContainer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function uploadFile(yamlFile: HTMLInputElement): void {
    fetch('/api/initiate')
      .then((res) => res.json())
      .then((res) => {
        dispatch(setURLs(res));
      })
      .then(() => {
        fetch('/api/pods')
          .then((res) => res.json())
          .then((res) => {
            dispatch(setData(res));
            navigate('/pods');
          });
      });
  }

  return (
    <div className={styles.yaml}>
      <div className={styles.fileborder}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            uploadFile(document.querySelector('#myFile') as HTMLInputElement);
          }}
        >
          <input type="file" id="myFile" name="filename" className={styles.fileInput}></input>
          <input type="submit" className={styles.button}></input>
        </form>
      </div>
    </div>
  );
}
