import React from 'react';
import styles from './DocsStyles.module.scss';
import gif1 from '../../../assets/login.gif';
import gif2 from '../../../assets/metrics.gif';

export default function About() {
  return (
    <>
      <div className={styles.docs} id="about">
        <img src={gif1} />
        <p>
          First time setup of ReKuberate will require an initial log in. Log in data is hashed and authenticated with
          bCrypt. Select the file location of where the application is downloaded and initiate data scraping from your
          kubernetes cluster. Make sure your cluster is running or else no data will be collected.
        </p>
        <img src={gif2} />
        <p>The nodes will be color-coded: red: error, yellow: pending, green: running.</p>
        <p>Hovering over each node will display additional details.</p>
      </div>
    </>
  );
}
