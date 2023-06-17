import { spawn, spawnSync } from 'child_process';
import { ClusterControllerType, obj } from '../types';

const clusterController: ClusterControllerType = {
  getPodAndNodeInfo: async (req, res, next) => {
    try {
      //execute terminal command to get pod info
      const pods = spawnSync('kubectl get pod -o wide', {
        shell: true,
        encoding: 'utf-8',
      });

      const podsOutput = pods.stdout;

      //remove all line breaks in terminal response
      const podsSplit: any = podsOutput.split(/[\n]/);
      //execute terminal command to get node status and save result to nodesOutput
      const nodes = spawnSync('minikube status', {
        shell: true,
        encoding: 'utf-8',
      });

      const nodesOutput = nodes.output;
      //assign minikube to first index of nodesOutput and remove all linebreaks
      const minikube = nodesOutput[1].split(/[\n]/);
      const obj: obj = {};
      let currentContainer: string = minikube[0];
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
        //if current element is an actual node, set it as a key in obj, containing a pods key with a value of an array
        if (minikube[i] === '') {
          i++;
          currentContainer = minikube[i];
          obj[currentContainer] = {};
          i++;
          obj[currentContainer].pods = [];
          //if string in podsSplit includes container name, push to container.pods with name and status key value pairs
          for (let j = 1; j < podsSplit.length - 1; j++) {
            if (podsSplit[j].includes(currentContainer)) {
              obj[currentContainer].pods.push({
                name: podsSplit[j][0],
                status: podsSplit[j][2],
              });
            }
          }
        }

        //create and separate each key, which is name of node property, by colon
        const key = minikube[i].slice(0, minikube[i].indexOf(': '));
        //assign key's value to node's corresponding value from terminal output
        obj[currentContainer][key] = minikube[i].slice(minikube[i].indexOf(': ') + 2);
      }
      
      res.locals.nodeAndPodInfo = obj;
      return next();
    } catch (err) {
      return next({
        log: `error in clusterController.getPodeAndNodeInfo: ${err}`,
        status: 500,
        message: { err: 'An error occurred getting pod and node info' },
      });
    }
  },
};

export default clusterController;
