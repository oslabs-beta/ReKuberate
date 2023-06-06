import React, { useEffect } from 'react';
import styles from './HomeContainerStyles.module.scss';
import { useAppDispatch } from '../store/hooks';
import { setData } from '../store/appSlice';
import { useNavigate } from 'react-router-dom';

export default function HomeContainer() {
  let obj = {
    minikube: {
      pods: [
        { name: 'prometheus-prometheus-node-exporter-twpfm', status: 'Running' },
        { name: 'thad-59bc548768-28cxn', status: 'Running' },
      ],
      type: 'Control Plane',
      host: 'Running',
      kubelet: 'Running',
      apiserver: 'Running',
      kubeconfig: 'Configured',
    },
    'minikube-m02': {
      pods: [
        { name: 'alertmanager-prometheus-kube-prometheus-alertmanager-0', status: 'Running' },
        { name: 'kai-8654fbf4bf-rg5ph', status: 'CrashLoopBackOff' },
        { name: 'kevin-65c6dc4c89-k8qq7', status: 'Running' },
        { name: 'prometheus-grafana-f76877bf7-bptcn', status: 'Running' },
        { name: 'prometheus-kube-prometheus-operator-6d94dc655b-wgzjq', status: 'Running' },
        { name: 'prometheus-kube-state-metrics-8674d7b847-wfbql', status: 'Running' },
        { name: 'prometheus-prometheus-kube-prometheus-prometheus-0', status: 'Running' },
        { name: 'prometheus-prometheus-node-exporter-mvf7s', status: 'Running' },
      ],
      type: 'Worker',
      host: 'Running',
      kubelet: 'Running',
    },
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  function uploadFile(yamlFile: HTMLInputElement): void {
    // fetch('/server', {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/x-yaml',
    //   },
    //   body: yamlFile.files[0],
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     dispatch(setData(res));
    //   });
    dispatch(setData(obj))
    navigate('/pods');
  }

  return (
    <div className={styles.yaml}>
      <div className={styles.fileborder}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            uploadFile(document.querySelector('#myFile') as HTMLInputElement);
          }}>
          <input type='file' id='myFile' name='filename' className={styles.fileInput}></input>
          <input type='submit' className={styles.button}></input>
        </form>
      </div>
    </div>
  );
}
