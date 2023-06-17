import React from 'react';
import styles from './HomeContainerStyles.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setLoading, setURLs } from '../store/appSlice';
import { useNavigate } from 'react-router-dom';

export default function HomeContainer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const podsIntervalID = useAppSelector((state) => state.app.podIntervalID);
  clearInterval(podsIntervalID);

  function submitCluster(): void {
    dispatch(setLoading('block'));
    fetch('/api/initiate')
      .then((res) => res.json())
      .then((res) => {
        dispatch(setURLs(res));
        navigate('/pods');
      });
  }

  return (
    <div className={styles.yaml}>
      <div className={styles.fileborder}>
        <div className={styles.infoContainer}>
          <p className={styles.info}><strong>Welcome to ReKuberate</strong>, an all-in-one cluster visualizer and metrics display application! Before starting, please check to
            be sure that your Kubernetes cluster is currently running. Once its running, you are ready to click submit. After a few brief seconds,
            your cluster will be displayed with real-time status updates. If by any chance you see just a single red pod on the next screen, it is most likely that your cluster
            is not running. 
          </p>
        </div>
        <button className={styles.submit} onClick= {() => submitCluster()}>Submit</button>
      </div>
    </div>
  );
}
