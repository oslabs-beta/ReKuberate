import React from 'react';
import styles from './DocsStyles.module.scss';

export default function Introduction() {
  return (
    <>
      <div className={styles.docs} id="introduction">
        <p>
          ReKuberate is a GUI that visualizes your kubernetes clusters in real time, allowing you to quickly
          diagnose problems and view exactly where they're located. The hierarchy of the cluster is displayed
          in a web, with each node and pod being color-coded. Additional information can be acquired by simply hovering over
          each node. Curated metrics on pod status and cluster health is also available. Compiled with electron, ReKuberate is 
          available for both windows and macOS, making downloading, installing, and initializing ReKuberate quick and simple.
        </p>
      </div>
    </>
  );
}
