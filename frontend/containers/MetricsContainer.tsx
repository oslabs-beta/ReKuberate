import React from 'react';
import { useAppSelector } from '../store/hooks';
import styles from './MetricsContainerStyles.module.scss';

export default function MetricsContainer() {
  const urls = useAppSelector((state) => state.app.URLs);
  // const allUrls = {
  //   numOfKublets,
  //   numOfPods,
  //   numOfContainers,
  //   cpuUsage,
  //   memUsageGraph,
  //   memUsageDial,
  //   availability,
  //   errorBudget
  // }

  {
    urls.numOfKublets.slice(0, 7) +
      ' className={styles.memory} ' +
      urls.numOfKublets.slice(8);
  }

  return (
    <div className={styles.bigDiv}>
      <div className={styles.topMetrics}>
        {urls.memUsageDial.slice(0, 7) +
          ' className={styles.memory} ' +
          urls.memUsageDial.slice(8)}
        {/* <iframe
          className={styles.memory}
          src='http://localhost:9000/d-solo/b2507d9e-33ba-491b-b32c-397512fe0837/node-exporter-nodes?orgId=1&refresh=30s&from=1686159308201&to=1686162908201&panelId=5'></iframe> */}
        <div className={styles.running}>
          <iframe
            className={styles.runningBlock}
            src="http://localhost:9000/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=10s&from=1686159018900&to=1686162618901&panelId=2"
          ></iframe>
          <iframe
            className={styles.runningBlock}
            src="http://localhost:9000/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=10s&from=1686159038026&to=1686162638026&panelId=3"
          ></iframe>
          <iframe
            className={styles.runningBlock}
            src="http://localhost:9000/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=10s&from=1686159050555&to=1686162650555&panelId=4"
          ></iframe>
        </div>
      </div>
      <div>
        <iframe
          className={styles.metrics}
          src="http://localhost:9000/d-solo/09ec8aa1e996d6ffcd6817bbaff4db1b/kubernetes-api-server?orgId=1&refresh=10s&from=1686159112299&to=1686162712299&panelId=3"
        ></iframe>
        <iframe
          className={styles.metrics}
          src="http://localhost:9000/d-solo/09ec8aa1e996d6ffcd6817bbaff4db1b/kubernetes-api-server?orgId=1&refresh=10s&from=1686159132708&to=1686162732708&panelId=4"
        ></iframe>
        <iframe
          className={styles.metrics}
          src="http://localhost:9000/d-solo/b2507d9e-33ba-491b-b32c-397512fe0837/node-exporter-nodes?orgId=1&refresh=30s&from=1686159346596&to=1686162946596&panelId=4"
        ></iframe>
        <iframe
          className={styles.metrics}
          src="http://localhost:9000/d-solo/09ec8aa1e996d6ffcd6817bbaff4db1b/kubernetes-api-server?orgId=1&refresh=10s&from=1686159207895&to=1686162807895&panelId=17"
        ></iframe>
      </div>
    </div>
  );
}
