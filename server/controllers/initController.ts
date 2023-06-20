import { spawn, spawnSync } from 'child_process';
import { InitControllerType } from '../types';
import webScrapper from './webScrapper.js';

const initController: InitControllerType = {
  //controller to install prometheus stack from helm and update
  installPrometheus: async (req, res, next) => {
    try {
      console.log('prometheus initialization controller running');
      //add helm reop for grafana
      spawnSync('helm repo add grafana https://grafana.github.io/helm-charts', {
        shell: true,
      });
      //fetch and build chart's dependencies
      spawnSync('helm dependency build ./kube-prometheus-stack', {
        shell: true,
      });
      //install newly built helm chart
      spawnSync('helm install prometheus ./kube-prometheus-stack', {
        shell: true,
      });
      return next();
    } catch (err) {
      //throw error if try block fails
      return next({
        log: `error in initController installPrometheus: ${err}`,
        status: 500,
        message: { err: 'An error occurred installing prometheus' },
      });
    }
  },

  //controller to port forward Grafana so that the metrics page can start scrapping data
  installGrafana: async (req, res, next) => {
    try {
      console.log('grafana initialization controller running');
      //establish port forwarding from local port 9000 to port 80
      const server = spawn('kubectl port-forward service/prometheus-grafana 9000:80', { shell: true, detached: true });
      server.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
      });
      server.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
      });
      //pass result of invoking webScrapper function on res.locals.graphs property
      res.locals.graphs = await webScrapper();
      return next();
    } catch (err) {
      //throw error if try block fails
      return next({
        log: `error in initController installGrafana: ${err}`,
        status: 500,
        message: { err: 'An error occurred port forwarding Grafana' },
      });
    }
  },
};

//export initController object
export default initController;
