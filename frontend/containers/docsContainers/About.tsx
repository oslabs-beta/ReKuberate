import React from 'react';
import styles from './DocsStyles.module.scss';
import gif1 from '../../../assets/login.gif';
import gif2 from '../../../assets/metrics.gif';

export default function About() {
  return (
    <>
      <div className={styles.docs} id="about">
        <img src={gif1} className={styles.gifs} />
        <p>
          First time setup of ReKuberate will require an initial sign up and login, where all info is hashed and authenticated.
          Once at the home page, select submit to initialize data scraping from your kubernetes cluster. 
          Make sure the cluster is running or else no data will be collected and a blank page will appear. Inital use will also require
          visiting localhost:9000 to sign in to Grafana using admin and prom-operator as the username and password.
        </p>
        <img src={gif2} className={styles.gifs} />
        <p>The displayed nodes are color-coded:  
          <span className={styles.red}>error</span>,  
          <span className={styles.yellow}>pending</span>,  
          <span className={styles.green}>running</span>.</p>
        <p>Hovering over each node will display additional details.</p>
      </div>
    </>
  );
}
