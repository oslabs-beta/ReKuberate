import { exec, spawn, spawnSync } from 'child_process';
import puppeteer from 'puppeteer';

// console.log('minikube start')
// let bat = spawnSync('minikube start', { shell: true , encoding: 'utf-8'})                                                       ;
// console.log(bat.stdout)

console.log(
  'helm repo add prometheus-community https://prometheus-community.github.io/helm-charts'
);
let bat = spawnSync(
  'helm repo add prometheus-community https://prometheus-community.github.io/helm-charts',
  { shell: true, encoding: 'utf-8' }
);
console.log(bat.stdout);

console.log('helm repo add stable https://charts.helm.sh/stable');
bat = spawnSync('helm repo add stable https://charts.helm.sh/stable', {
  shell: true,
  encoding: 'utf-8',
});
console.log(bat.stdout);

console.log('helm repo update');
bat = spawnSync('helm repo update', { shell: true, encoding: 'utf-8' });
console.log(bat.stdout);

console.log(
  'helm install prometheus prometheus-community/kube-prometheus-stack'
);
bat = spawnSync(
  'helm install prometheus prometheus-community/kube-prometheus-stack',
  { shell: true, encoding: 'utf-8' }
);
console.log(bat.stdout);

console.log('kubectl port-forward deployment/prometheus-grafana 3000');
bat = spawn('kubectl port-forward deployment/prometheus-grafana 3000', {
  shell: true,
  detached: true,
});
bat.stdout.on('data', (data) => {
  console.log(data.toString());
});

bat.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});

// const test = async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   await page.goto('http://localhost:3000');
// };
// test();
