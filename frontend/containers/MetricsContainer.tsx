import React from 'react';
import styles from './MetricsContainerStyles.module.scss';

export default function MetricsContainer() {
  return (
    <div className={styles.bigDiv}>
      <div className={styles.topMetrics}>
        <iframe
          className={styles.memory}
          src='http://localhost:3000/d-solo/cd0e9de9-a5c6-4cd0-b87c-11f0c24b6722/node-exporter-nodes?orgId=1&refresh=5s&from=1686057914360&to=1686061514360&panelId=5'></iframe>
        <div className={styles.running}>
          <iframe
            className={styles.runningBlock}
            src='http://localhost:3000/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=10s&from=1686057520072&to=1686061120072&panelId=2'></iframe>
          <iframe
            className={styles.runningBlock}
            src='http://localhost:3000/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=10s&from=1686057542896&to=1686061142896&panelId=3'></iframe>
          <iframe
            className={styles.runningBlock}
            src='http://localhost:3000/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=10s&from=1686057558274&to=1686061158274&panelId=4'></iframe>
        </div>
      </div>
      <div>
        <iframe
          className={styles.metrics}
          src='http://localhost:3000/d-solo/09ec8aa1e996d6ffcd6817bbaff4db1b/kubernetes-api-server?orgId=1&refresh=10s&from=1686064376412&to=1686067976412&panelId=3'></iframe>
        <iframe
          className={styles.metrics}
          src='http://localhost:3000/d-solo/09ec8aa1e996d6ffcd6817bbaff4db1b/kubernetes-api-server?orgId=1&refresh=10s&from=1686064456160&to=1686068056160&panelId=4'></iframe>
        <iframe
          className={styles.metrics}
          src='http://localhost:3000/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=10s&from=1686057591233&to=1686061191233&panelId=23'></iframe>
        <iframe
          className={styles.metrics}
          src='http://localhost:3000/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=10s&from=1686057598349&to=1686061198349&panelId=24'></iframe>
      </div>
    </div>
  );
}
