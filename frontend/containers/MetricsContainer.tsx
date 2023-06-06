import React from 'react';
import styles from './MetricsContainerStyles.module.scss';

export default function MetricsContainer() {
  return (
    <div className={styles.bigDiv}>
      <div className={styles.topMetrics}>
        <iframe
          className={styles.memory}
          src='http://localhost:8000/d-solo/bb16c020-3528-4db5-81de-d5e0081eaaf7/node-exporter-nodes?orgId=1&refresh=30s&from=1686073626190&to=1686077226190&panelId=5'></iframe>
        <div className={styles.running}>
          <iframe
            className={styles.runningBlock}
            src='http://localhost:8000/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=10s&from=1686073714401&to=1686077314401&panelId=2'></iframe>
          <iframe
            className={styles.runningBlock}
            src='http://localhost:8000/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=10s&from=1686073730807&to=1686077330807&panelId=3'></iframe>
          <iframe
            className={styles.runningBlock}
            src='http://localhost:8000/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=10s&from=1686073745632&to=1686077345632&panelId=4'></iframe>
        </div>
      </div>
      <div>
        <iframe
          className={styles.metrics}
          src='http://localhost:8000/d-solo/09ec8aa1e996d6ffcd6817bbaff4db1b/kubernetes-api-server?orgId=1&refresh=10s&from=1686073564519&to=1686077164519&panelId=3'></iframe>
        <iframe
          className={styles.metrics}
          src='http://localhost:8000/d-solo/09ec8aa1e996d6ffcd6817bbaff4db1b/kubernetes-api-server?orgId=1&refresh=10s&from=1686073879587&to=1686077479587&panelId=4'></iframe>
        <iframe
          className={styles.metrics}
          src='http://localhost:8000/d-solo/632e265de029684c40b21cb76bca4f94/kubernetes-proxy?orgId=1&refresh=10s&from=1686073801036&to=1686077401036&panelId=10'></iframe>
        <iframe
          className={styles.metrics}
          src='http://localhost:8000/d-solo/632e265de029684c40b21cb76bca4f94/kubernetes-proxy?orgId=1&refresh=10s&from=1686073839054&to=1686077439054&panelId=11'></iframe>
      </div>
    </div>
  );
}
