import { spawn, spawnSync } from 'child_process';
import { InitControllerType } from '../types';

const initController: InitControllerType = {
  installPrometheus: (req, res, next) => {
    console.log('prometheus initialization controller running')
    spawnSync('helm repo add prometheus-community https://prometheus-community.github.io/helm-charts', { shell: true });
    spawnSync('helm repo add stable https://charts.helm.sh/stable', {shell: true});
    spawnSync('helm repo update'), {shell: true};
    spawnSync('helm install prometheus prometheus-community/kube-prometheus-stack', { shell: true });
    return next();
  },

  installGrafana: (req, res, next) => {
    console.log('grafana initialization controller running')
    // spawn('kubectl port-forward deployment/prometheus-grafana 3000', {shell: true, detached: true})
    spawn('kubectl port-forward service/prometheus-grafana 8000:80', {shell: true, detached: true})
    return next();
  }  
}

export default initController;