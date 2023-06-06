import { spawnSync } from 'child_process';

console.log('getting pods');
const pods = spawnSync('kubectl get pod -o wide', {
  shell: true,
  encoding: 'utf-8',
});
// console.log(pods.stdout);
const podsOutput = pods.stdout;
const podsSplit = podsOutput.split(/[\n]/);
// console.log(podsSplit)

console.log('getting nodes');
const nodes = spawnSync('minikube status', { shell: true, encoding: 'utf-8' });
const nodesOutput = nodes.output;

const minikube = nodesOutput[1].split(/[\n]/);
const obj = {};
let currentContainer = minikube[0];
obj[currentContainer] = {};
obj[currentContainer].pods = [];

//splitting the strings into individual strings seperated by one space
for (let i = 1; i < podsSplit.length - 1; i++) {
  podsSplit[i] = podsSplit[i].replace(/\s+/g, ' ');
  podsSplit[i] = podsSplit[i].split(/[' ']/);

  //if string includes container name, push to container.pods
  if (podsSplit[i].includes(currentContainer)) {
    obj[currentContainer].pods.push({
      name: podsSplit[i][0],
      status: podsSplit[i][2],
    });
  }
}

for (let i = 1; i < minikube.length - 2; i++) {
  if (minikube[i] === '') {
    i++;
    currentContainer = minikube[i];
    obj[currentContainer] = {};
    i++;
    obj[currentContainer].pods = [];
    //if string includes container name, push to container.pods
    for (let j = 1; j < podsSplit.length - 1; j++) {
      if (podsSplit[j].includes(currentContainer)) {
        // console.log(podsSplit[j][0]);
        obj[currentContainer].pods.push({
          name: podsSplit[j][0],
          status: podsSplit[j][2],
        });
      }
    }
  }

  const key = minikube[i].slice(0, minikube[i].indexOf(': '));
  obj[currentContainer][key] = minikube[i].slice(minikube[i].indexOf(': ') + 2);
}

console.log(obj);
// console.log(minikube);
