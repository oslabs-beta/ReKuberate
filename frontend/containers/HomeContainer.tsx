import React from 'react';
import styles from './HomeContainerStyles.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setData, setLoading, setPodIntervalID, setURLs } from '../store/appSlice';
import { useNavigate } from 'react-router-dom';

export default function HomeContainer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const podIntervalID = useAppSelector((state) => state.app.podIntervalID);
  function uploadFile(yamlFile: HTMLInputElement): void {
    clearInterval(podIntervalID);
    dispatch(setLoading('block'));
    fetch('/api/initiate')
      .then((res) => res.json())
      .then((res) => {
        dispatch(setURLs(res));
        dispatch(setLoading('none'));
        dispatch(
          setPodIntervalID(
            setInterval(() => {
              fetch('/api/pods')
                .then((res) => res.json())
                .then((res) => {
                  dispatch(setData(res));
                });
            }, 2000)
          )
        );
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
