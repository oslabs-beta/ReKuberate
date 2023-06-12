import React from 'react';
import styles from './HomeContainerStyles.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setLoading, setURLs } from '../store/appSlice';
import { useNavigate } from 'react-router-dom';

export default function HomeContainer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const podsIntervalID = useAppSelector((state) => state.app.podIntervalID);
  clearInterval(podsIntervalID)
  
  function uploadFile(yamlFile: HTMLInputElement): void {
    dispatch(setLoading('block'));
    fetch('/api/initiate')
      .then((res) => res.json())
      .then((res) => {
        dispatch(setURLs(res));
        dispatch(setLoading('none'));
        navigate('/pods');
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
