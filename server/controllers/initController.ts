import { spawn, spawnSync } from "child_process";
import { InitControllerType } from "../types";
import webScrapper from "./webScrapper.js";

const initController: InitControllerType = {
  //controller to install prometheus stack from help and update
  installPrometheus: async (req, res, next) => {
    try {
      console.log("prometheus initialization controller running");
      spawnSync("helm repo add grafana https://grafana.github.io/helm-charts", {
        shell: true,
      });
      spawnSync("helm dependency build ./kube-prometheus-stack", {
        shell: true,
      });
      spawnSync("helm install prometheus ./kube-prometheus-stack", {
        shell: true,
      });
      return next();
    } catch (err) {
      return next({
        log: `error in initController installPromteheus: ${err}`,
        status: 500,
        message: { err: "An error occurred installing prometheus" },
      });
    }
  },

  //controller to port forward Grafana so that the metrics page can start scrapping data
  installGrafana: async (req, res, next) => {
    try {
      console.log("grafana initialization controller running");
      // spawn('kubectl port-forward deployment/prometheus-grafana 3000', {shell: true, detached: true})
      const server = spawn(
        "kubectl port-forward service/prometheus-grafana 9000:80",
        { shell: true, detached: true }
      );
      server.stdout.on("data", function (data) {
        console.log("stdout: " + data);
      });
      server.stderr.on("data", function (data) {
        console.log("stderr: " + data);
      });
      res.locals.graphs = await webScrapper();
      return next();
    } catch (err) {
      return next({
        log: `error in initController installGrafana: ${err}`,
        status: 500,
        message: { err: "An error occurred port forwarding Grafana" },
      });
    }
  },
};

export default initController;
