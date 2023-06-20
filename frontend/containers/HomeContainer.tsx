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

  //onclick submit Cluster of the submit button, it we send a fetch request to the backend where ultimately we will reroute to the pod's container
  function submitCluster(): void {
    dispatch(setLoading('block'));
    fetch('/api/initiate')
      .then((res) => res.json())
      .then((res) => {
        dispatch(setURLs(res));
        navigate('/pods');
      });
  }

  //the render components of the home page, will include a brief description of what the app is, a submit button for the pods to be initiated, and a redirection to the pods component endpoint
  return (
    <div className={styles.yaml}>
      <div className={styles.fileborder}>
        <div className={styles.infoContainer}>
          <p className={styles.info}><strong>Welcome to ReKuberate</strong>, an all-in-one cluster visualizer and metrics display application! Before starting, please check to
            be sure that your Kubernetes cluster is currently running. Once its running, you are ready to click submit. After a few brief seconds,
            your cluster will be displayed with real-time status updates. If by any chance you see just a single red pod on the next screen, it is most likely that your cluster
            is not running. Before going to the metrics page for the first time, please be sure to visit localhost:9000 to sign in to Grafana using admin and prom-operator as the username
            and password.
          </p>
        </div>
        <button className={styles.submit} onClick= {() => submitCluster()}>Submit</button>
      </div>
    </div>
  );
}
