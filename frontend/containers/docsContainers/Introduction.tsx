import React from 'react';
import styles from './DocsStyles.module.scss';

export default function Introduction() {
  return (
    <>
      <div className={styles.docs} id="introduction">
        <p>
          ReKuberate is a GUI that visualizes your kubernetes clusters in real time, allowing you to quickly see and
          diagnose problems and exactly where they're located. The hierarchy of the cluster is displayed
          straightforward, with each node and pod color-coordinated, and with additional information on hover. Curated
          metrics on pod status and cluster health is also available. Compiled with electron and available for both
          windows and macOS, downloading, installing, and initializing ReKuberate is quick and simple.
        </p>
      </div>
    </>
  );
}
