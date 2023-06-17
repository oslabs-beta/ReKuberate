[![Untitled (1000 × 300 px)](https://raw.githubusercontent.com/oslabs-beta/ReKuberate/dev/assets/ReKuberate.png)](https://rekuberate.org)

<div align='center'>

### The power of Kubernetes, visualized on your screen. Scale effortlessly, debug painlessly.

<hr>

</div>
<a href="https://github.com/open-source-labs/ReKuberate/issues">Report Bug</a>
·
<a href="https://rekuberate.org">Documentation</a>

## ReKuberate

ReKuberate is a GUI that visualizes your kubernetes clusters in real time, allowing you to quickly see and diagnose problems and exactly where they're located. The hierarchy of the cluster is displayed straightforward, with each node and pod color-coordinated, and with additional information on hover. Curated metrics on pod status and cluster health is also available. Compiled with electron and available for both windows and macOS, downloading, installing, and initializing ReKuberate is quick and simple.

## About

<img src='assets/login.gif'>
First time setup of ReKuberate will require an initial log in. Log in data is hashed and authenticated with bCrypt. Select the file location of where the application is downloaded and initiate data scraping from your kubernetes cluster. Make sure your cluster is running or else no data will be collected.

The nodes will be color-coded: **red**: error, **yellow**: pending, **green**: running.

Hovering over each node will display additional details.

<img src='assets/metrics.gif'>

The metrics page displays selected data information displayed in a graph form to give you a quick and easy overview of your cluster health and computer usage.

## Install

Installation is incredible simple

1. Head over to <a href="https://rekuberate.org">ReKuberate.org</a>
2. Click on download
3. Extract the zip file
4. Open the extracted folder in VSCode
5. Install dependencies with 'npm install'
6. Start the application with 'npm run electron'
7. Enjoy!
8. If the metrics do not load but the boxes appear, try going to http://localhost:9000 and logging in with **username:** admin, **password:** prom-operator

## Technologies

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/-react-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Redux](https://img.shields.io/badge/-Redux-764ABC?style=for-the-badge&logo=react&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-2CA5E0?style=for-the-badge&logo=webpack&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Electron](https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-326ce5.svg?&style=for-the-badge&logo=kubernetes&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F2F4F9?style=for-the-badge&logo=grafana&logoColor=orange&labelColor=F2F4F9)
![Prometheus](https://img.shields.io/badge/Prometheus-000000?style=for-the-badge&logo=prometheus&labelColor=000000)
![Helm](https://img.shields.io/badge/Helm-0F1689?style=for-the-badge&logo=Helm&labelColor=0F1689)
![Jest](https://img.shields.io/badge/jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-31648C?style=for-the-badge&logo=postgresql&logoColor=white)
![Puppeteer](https://img.shields.io/badge/puppeteer-white?style=for-the-badge&logo=puppeteer&logoColor=01D8A2)

## Built with ♥

Thad White | <a href='https://github.com/thadd225'>Github</a> | <a href='https://www.linkedin.com/in/thad-white/'>LinkedIn</a><br>
Fabrizzio Quintanilla | <a href='https://github.com/Fab3005'>Github</a> | <a href='https://www.linkedin.com/in/fabrizzio-quintanilla-b58388244/'>LinkedIn</a><br>
Hunter Shaw | <a href='https://github.com/HShaw215'>Github</a> | <a href='https://www.linkedin.com/in/hunter-shaw-39430a181/'>LinkedIn</a><br>
Kai Farrell | <a href='https://github.com/farrellkai'>Github</a> | <a href='https://www.linkedin.com/in/kaifarrell/'>LinkedIn</a><br>
Kevin Fan | <a href='https://github.com/kfan1'>Github</a> | <a href='https://www.linkedin.com/in/kfan1/'>LinkedIn</a><br>
