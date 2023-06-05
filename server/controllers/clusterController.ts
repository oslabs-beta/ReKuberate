import { spawn, spawnSync } from 'child_process';
import { ClusterControllerType } from '../types';

const clusterController: ClusterControllerType = {
  getPodInfo: (req, res, next) => {
    console.log('getting pod info')
    const podInfo = spawnSync('kubectl get pods', {shell: true, encoding: 'utf-8'})
    console.log(podInfo.stdout)
  },
  
  getNodeInfo: (req, res, next) => {
    console.log('getting node info')
    
  }
  
}