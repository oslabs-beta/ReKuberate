import React, { useEffect } from 'react';
import styles from './D3Styles.module.scss';
import drawChart from '../components/drawD3Chart';

export default function D3() {
  const data = {
    nodes: [
      { id: 'minikube', group: 'green' },
      { id: 'alertmanager-prometheus-kube-prometheus-alertmanager-0', group: 'green' },
      { id: 'prometheus-grafana-cd8448b68-d5m7p', group: 'green' },
      { id: 'prometheus-kube-prometheus-admission-patch-ngq94', group: 'green' },
      { id: 'prometheus-kube-state-metrics-8674d7b847-8cs7f', group: 'green' },
      { id: 'prometheus-prometheus-kube-prometheus-prometheus-0', group: 'green' },
      { id: 'prometheus-prometheus-node-exporter-j7gfv', group: 'green' },
      { id: 'minikube-m02', group: 'green' },
      { id: 'fabrizzio-7bf84d6cdd-jfffx', group: 'orange' },
      { id: 'hunter-7f6bb7649-f7nd4', group: 'green' },
      { id: 'kai-8654fbf4bf-rm5kd', group: 'red' },
      { id: 'prometheus-prometheus-node-exporter-mvx6h', group: 'green' },
      { id: 'minikube-m03', group: 'green' },
      { id: 'kevin-65c6dc4c89-9kjtx', group: 'orange' },
      { id: 'thad-59bc548768-8dq9q', group: 'green' },
      { id: 'minikube-m04', group: 'green' },
      { id: 'prometheus-prometheus-node-exporter-qrq4l', group: 'green' },
    ],
    links: [
      { source: 'minikube', target: 'alertmanager-prometheus-kube-prometheus-alertmanager-0', value: 1 },
      { source: 'minikube', target: 'prometheus-grafana-cd8448b68-d5m7p', value: 1 },
      { source: 'minikube', target: 'prometheus-kube-prometheus-admission-patch-ngq94', value: 1 },
      { source: 'minikube', target: 'prometheus-kube-state-metrics-8674d7b847-8cs7f', value: 1 },
      { source: 'minikube', target: 'prometheus-prometheus-kube-prometheus-prometheus-0', value: 1 },
      { source: 'minikube', target: 'prometheus-prometheus-node-exporter-j7gfv', value: 1 },
      { source: 'minikube', target: 'minikube-m02', value: 1 },
      { source: 'minikube-m02', target: 'fabrizzio-7bf84d6cdd-jfffx', value: 1 },
      { source: 'minikube-m02', target: 'hunter-7f6bb7649-f7nd4', value: 1 },
      { source: 'minikube-m02', target: 'kai-8654fbf4bf-rm5kd', value: 1 },
      { source: 'minikube-m02', target: 'prometheus-prometheus-node-exporter-mvx6h', value: 1 },
      { source: 'minikube', target: 'minikube-m03', value: 1 },
      { source: 'minikube-m03', target: 'kevin-65c6dc4c89-9kjtx', value: 1 },
      { source: 'minikube-m03', target: 'thad-59bc548768-8dq9q', value: 1 },
      { source: 'minikube', target: 'minikube-m04', value: 1 },
      { source: 'minikube-m04', target: 'prometheus-prometheus-node-exporter-qrq4l', value: 1 },
    ],
  };

  useEffect(() => {
    document.querySelector(`.${styles.d3Div}`).appendChild(drawChart(data));
  });

  return <div className={styles.d3Div}></div>;
}
