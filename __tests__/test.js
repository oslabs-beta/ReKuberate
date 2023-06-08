// import { exec, spawn, spawnSync } from 'child_process';
// import puppeteer from 'puppeteer';

// console.log('minikube start')
// let bat = spawnSync('minikube start', { shell: true , encoding: 'utf-8'})                                                       ;
// console.log(bat.stdout)

// console.log('helm repo add prometheus-community https://prometheus-community.github.io/helm-charts')
// bat = spawnSync('helm repo add prometheus-community https://prometheus-community.github.io/helm-charts', { shell: true , encoding: 'utf-8'})                                                       ;
// console.log(bat.stdout)

// console.log('helm repo add stable https://charts.helm.sh/stable')
// bat = spawnSync('helm repo add stable https://charts.helm.sh/stable', { shell: true , encoding: 'utf-8'})                                                       ;
// console.log(bat.stdout)

// console.log('helm repo update')
// bat = spawnSync('helm repo update', { shell: true , encoding: 'utf-8'})                                                       ;
// console.log(bat.stdout)

// console.log('helm install prometheus prometheus-community/kube-prometheus-stack')
// bat = spawnSync('helm install prometheus prometheus-community/kube-prometheus-stack', { shell: true , encoding: 'utf-8'})                                                       ;
// console.log(bat.stdout)

// console.log('kubectl port-forward deployment/prometheus-grafana 3000')
// bat = spawn('kubectl port-forward deployment/prometheus-grafana 3000', { shell: true, detached: true })                                                       ;
// bat.stdout.on('data', (data) => {
//   console.log(data.toString());
// });

// bat.on('exit', (code) => {
//   console.log(`Child exited with code ${code}`);
// });

// const test = async () => {
//   const browser = await puppeteer.launch({headless: false});
//   const page = await browser.newPage();

//   await page.goto('http://localhost:3000');

// };
// test()

import { spawnSync, spawn } from "child_process";

console.log("hello");

// const func = () => {

// }
const repo = spawnSync(
  "helm repo add grafana https://grafana.github.io/helm-charts",
  { shell: true, encoding: "utf-8" }
);
console.log(repo.stdout);
console.log(repo.stderr);

const dependencies = spawnSync(
  "helm dependency build ./kube-prometheus-stack",
  { shell: true, encoding: "utf-8" }
);

console.log(dependencies.stdout);
console.log(dependencies.stderr);
const prometheus = spawnSync(
  "helm install prometheus ./kube-prometheus-stack",
  { shell: true, encoding: "utf-8" }
);
console.log(prometheus.stdout);
console.log(prometheus.stderr);

console.log("HERE");

("kubectl port-forward services/prometheus-grafana 9000:80");

// console.log('getting pods');
// const pods = spawnSync('kubectl get pod -o wide', {
//   shell: true,
//   encoding: 'utf-8',
// });
// // console.log(pods.stdout);
// const podsOutput = pods.stdout;
// const podsSplit = podsOutput.split(/[\n]/);
// // console.log(podsSplit)

// console.log('getting nodes');
// const nodes = spawnSync('minikube status', { shell: true, encoding: 'utf-8' });
// const nodesOutput = nodes.output;

// const minikube = nodesOutput[1].split(/[\n]/);
// const obj = {};
// let currentContainer = minikube[0];
// obj[currentContainer] = {};
// obj[currentContainer].pods = [];

// //splitting the strings into individual strings seperated by one space
// for (let i = 1; i < podsSplit.length - 1; i++) {
//   podsSplit[i] = podsSplit[i].replace(/\s+/g, ' ');
//   podsSplit[i] = podsSplit[i].split(/[' ']/);

//   //if string includes container name, push to container.pods
//   if (podsSplit[i].includes(currentContainer)) {
//     obj[currentContainer].pods.push({
//       name: podsSplit[i][0],
//       status: podsSplit[i][2],
//     });
//   }
// }

// for (let i = 1; i < minikube.length - 2; i++) {
//   if (minikube[i] === '') {
//     i++;
//     currentContainer = minikube[i];
//     obj[currentContainer] = {};
//     i++;
//     obj[currentContainer].pods = [];
//     //if string includes container name, push to container.pods
//     for (let j = 1; j < podsSplit.length - 1; j++) {
//       if (podsSplit[j].includes(currentContainer)) {
//         obj[currentContainer].pods.push({
//           name: podsSplit[j][0],
//           status: podsSplit[j][2],
//         });
//       }
//     }
//   }

//   const key = minikube[i].slice(0, minikube[i].indexOf(': '));
//   obj[currentContainer][key] = minikube[i].slice(minikube[i].indexOf(': ') + 2);
// }

// console.log(obj);
