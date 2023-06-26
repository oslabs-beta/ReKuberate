import React from 'react';
import './PodsContainerStyles.scss';
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import { MockData } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setData, setLoading, setPodIntervalID } from '../store/appSlice';

// Fetches data from our server and renders data into a network graph using Anychart
// Data is divided into nodes and edges with conditional coloring
export default function PodsContainer() {

// Mock data for online demo
  const chartData = {
    nodes: [
      {
        hovered: { fill: '#51cf51' },
        id: 'minikube',
        name: 'minikube',
        nodeName: 'minikube',
        normal: { fill: '#008000' },
        purpose: 'Control Plane',
        selected: { fill: '#036803' },
        status: 'Running',
      },
      {
        hovered: { fill: '#51cf51' },
        id: 'minikube-0',
        name: 'alertmanager-prometheus-kube-prometheus-alertmanager-0',
        normal: { fill: '#008000' },
        purpose: 'Pod',
        selected: { fill: '#036803' },
        status: 'Running',
      },
      {
        hovered: { fill: '#51cf51' },
        id: 'minikube-1',
        name: 'prometheus-grafana-cd8448b68-d5m7p',
        normal: { fill: '#008000' },
        purpose: 'Pod',
        selected: { fill: '#036803' },
        status: 'Running',
      },
      {
        hovered: { fill: '#fc7474' },
        id: 'minikube-2',
        name: 'prometheus-kube-prometheus-admission-patch-ngq94',
        normal: { fill: '#ff0000' },
        purpose: 'Pod',
        selected: { fill: '#940000' },
        status: 'Completed',
      },
      {
        hovered: { fill: '#51cf51' },
        id: 'minikube-3',
        name: 'prometheus-kube-prometheus-operator-6d94dc655b-tg6nz',
        normal: { fill: '#008000' },
        purpose: 'Pod',
        selected: { fill: '#036803' },
        status: 'Running',
      },
      {
        hovered: { fill: '#51cf51' },
        id: 'minikube-4',
        name: 'prometheus-kube-state-metrics-8674d7b847-8cs7f',
        normal: { fill: '#008000' },
        purpose: 'Pod',
        selected: { fill: '#036803' },
        status: 'Running',
      },
      {
        hovered: { fill: '#51cf51' },
        id: 'minikube-5',
        name: 'prometheus-prometheus-kube-prometheus-prometheus-0',
        normal: { fill: '#008000' },
        purpose: 'Pod',
        selected: { fill: '#036803' },
        status: 'Running',
      },
      {
        hovered: { fill: '#51cf51' },
        id: 'minikube-6',
        name: 'prometheus-prometheus-node-exporter-j7gfv',
        normal: { fill: '#008000' },
        purpose: 'Pod',
        selected: { fill: '#036803' },
        status: 'Running',
      },
      {
        hovered: { fill: '#51cf51' },
        id: 'minikube-m02',
        name: 'minikube-m02',
        nodeName: 'minikube-m02',
        normal: { fill: '#008000' },
        purpose: 'Worker',
        selected: { fill: '#036803' },
        status: 'Running',
      },
      {
        hovered: { fill: '#51cf51' },
        id: 'minikube-m02-0',
        name: 'fabrizzio-7bf84d6cdd-jfffx',
        normal: { fill: '#008000' },
        purpose: 'Pod',
        selected: { fill: '#036803' },
        status: 'Running',
      },
      {
        hovered: { fill: '#51cf51' },
        id: 'minikube-m02-1',
        name: 'hunter-7f6bb7649-f7nd4',
        normal: { fill: '#008000' },
        purpose: 'Pod',
        selected: { fill: '#036803' },
        status: 'Running',
      },
      {
        hovered: { fill: '#fc7474' },
        id: 'minikube-m02-2',
        name: 'kai-8654fbf4bf-rm5kd',
        normal: { fill: '#ff0000' },
        purpose: 'Pod',
        selected: { fill: '#940000' },
        status: 'OOMKilled',
      },
      {
        hovered: { fill: '#51cf51' },
        id: 'minikube-m02-3',
        name: 'prometheus-prometheus-node-exporter-mvx6h',
        normal: { fill: '#008000' },
        purpose: 'Pod',
        selected: { fill: '#036803' },
        status: 'Running',
      },
      {
        hovered: { fill: '#51cf51' },
        id: 'minikube-m03',
        name: 'minikube-m03',
        nodeName: 'minikube-m03',
        normal: { fill: '#008000' },
        purpose: 'Worker',
        selected: { fill: '#036803' },
        status: 'Running',
      },
      {
        hovered: { fill: '#fac86a' },
        id: 'minikube-m03-0',
        name: 'kevin-65c6dc4c89-9kjtx',
        normal: { fill: '#ffa500' },
        purpose: 'Pod',
        selected: { fill: '#ca8606' },
        status: 'Pending',
      },
      {
        hovered: { fill: '#51cf51' },
        id: 'minikube-m03-1',
        name: 'prometheus-prometheus-node-exporter-s9d2h',
        normal: { fill: '#008000' },
        purpose: 'Pod',
        selected: { fill: '#036803' },
        status: 'Running',
      },
      {
        hovered: { fill: '#51cf51' },
        id: 'minikube-m03-2',
        name: 'thad-59bc548768-8dq9q',
        normal: { fill: '#008000' },
        purpose: 'Pod',
        selected: { fill: '#036803' },
        status: 'Running',
      },
      {
        hovered: { fill: '#51cf51' },
        id: 'minikube-m04',
        name: 'minikube-m04',
        nodeName: 'minikube-m04',
        normal: { fill: '#008000' },
        purpose: 'Worker',
        selected: { fill: '#036803' },
        status: 'Running',
      },
      {
        hovered: { fill: '#51cf51' },
        id: 'minikube-m04-0',
        name: 'prometheus-prometheus-node-exporter-qrq4l',
        normal: { fill: '#008000' },
        purpose: 'Pod',
        selected: { fill: '#036803' },
        status: 'Running',
      },
    ],
    edges: [
      { from: 'minikube', to: 'minikube-0' },
      { from: 'minikube', to: 'minikube-1' },
      { from: 'minikube', to: 'minikube-2' },
      { from: 'minikube', to: 'minikube-3' },
      { from: 'minikube', to: 'minikube-4' },
      { from: 'minikube', to: 'minikube-5' },
      { from: 'minikube', to: 'minikube-6' },
      { from: 'minikube', to: 'minikube' },
      { from: 'minikube-m02', to: 'minikube-m02-0' },
      { from: 'minikube-m02', to: 'minikube-m02-1' },
      { from: 'minikube-m02', to: 'minikube-m02-2' },
      { from: 'minikube-m02', to: 'minikube-m02-3' },
      { from: 'minikube', to: 'minikube-m02' },
      { from: 'minikube-m03', to: 'minikube-m03-0' },
      { from: 'minikube-m03', to: 'minikube-m03-1' },
      { from: 'minikube-m03', to: 'minikube-m03-2' },
      { from: 'minikube', to: 'minikube-m03' },
      { from: 'minikube-m04', to: 'minikube-m04-0' },
      { from: 'minikube', to: 'minikube-m04' },
    ],
  };

  const chart = anychart.graph(chartData);
  chart.background('#d8d8d8');

  const background = chart.background();
  background.stroke({
    keys: ['#fffeee00'],
    thickness: 20,
    angle: 90,
  });
  background.cornerType('round');
  background.corners(10);

  const nodes = chart.nodes();
  nodes.normal().height(30);
  nodes.hovered().height(45);

  nodes.labels().enabled(true);
  nodes.labels().format('{%nodeName}');
  nodes.labels().fontSize(12);
  nodes.labels().fontWeight(600);
  nodes.labels().fontColor('black');

  nodes.tooltip().fontSize(18);
  nodes.tooltip().background('white');
  nodes.tooltip().fontColor('black');
  nodes.tooltip().format(`name: {%name}\nstatus: {%status}\ntype: {%purpose}`);

  const edges = chart.edges();
  edges.normal().stroke('#7ec5ff');
  edges.selected().stroke('#7ec5ff');
  edges.arrows({
    enabled: true,
    size: 18,
  });

  chart.container('container');


// Uncomment for realtime data
  // const data: any = useAppSelector((state) => state.app.data);
  // const firstKey = Object.keys(data)[0];

  // const chartData: MockData = {
  //   nodes: [],
  //   edges: [],
  // };

  // for (const key in data) {
  //   if (data[key].host === 'Running') {
  //     chartData.nodes.push({
  //       id: key,
  //       name: key,
  //       nodeName: key,
  //       status: data[key].host,
  //       purpose: data[key].type,
  //       normal: { fill: '#008000' },
  //       hovered: { fill: '#51cf51' },
  //       selected: { fill: '#036803' },
  //     });
  //   } else if (data[key].host === 'Pending') {
  //     chartData.nodes.push({
  //       id: key,
  //       name: key,
  //       nodeName: key,
  //       status: data[key].host,
  //       purpose: data[key].type,
  //       normal: { fill: '#ffa500' },
  //       hovered: { fill: '#fac86a' },
  //       selected: { fill: '#ca8606' },
  //     });
  //   } else {
  //     chartData.nodes.push({
  //       id: key,
  //       name: key,
  //       nodeName: key,
  //       status: data[key].host,
  //       purpose: data[key].type,
  //       normal: { fill: '#ff0000' },
  //       hovered: { fill: '#fc7474' },
  //       selected: { fill: '#940000' },
  //     });
  //   }
  //   for (let i = 0; i < data[key].pods.length; i++) {
  //     if (data[key].pods[i].status === 'Running') {
  //       chartData.nodes.push({
  //         id: `${key}-${i}`,
  //         name: data[key].pods[i].name,
  //         status: data[key].pods[i].status,
  //         purpose: 'Pod',
  //         normal: { fill: '#008000' },
  //         hovered: { fill: '#51cf51' },
  //         selected: { fill: '#036803' },
  //       });
  //     } else if (data[key].pods[i].status === 'Pending') {
  //       chartData.nodes.push({
  //         id: `${key}-${i}`,
  //         name: data[key].pods[i].name,
  //         status: data[key].pods[i].status,
  //         purpose: 'Pod',
  //         normal: { fill: '#ffa500' },
  //         hovered: { fill: '#fac86a' },
  //         selected: { fill: '#ca8606' },
  //       });
  //     } else {
  //       chartData.nodes.push({
  //         id: `${key}-${i}`,
  //         name: data[key].pods[i].name,
  //         status: data[key].pods[i].status,
  //         purpose: 'Pod',
  //         normal: { fill: '#ff0000' },
  //         hovered: { fill: '#fc7474' },
  //         selected: { fill: '#940000' },
  //       });
  //     }
  //     chartData.edges.push({ from: key, to: `${key}-${i}` });
  //   }
  //   chartData.edges.push({ from: firstKey, to: key });
  // }

  // const chart = anychart.graph(chartData);
  // chart.background('#d8d8d8');

  // const background = chart.background();
  // background.stroke({
  //   keys: ['#fffeee00'],
  //   thickness: 20,
  //   angle: 90,
  // });
  // background.cornerType('round');
  // background.corners(0, 0, 10, 10);

  // const nodes = chart.nodes();
  // nodes.normal().height(30);
  // nodes.hovered().height(45);

  // nodes.labels().enabled(true);
  // nodes.labels().format('{%nodeName}');
  // nodes.labels().fontSize(12);
  // nodes.labels().fontWeight(600);
  // nodes.labels().fontColor('black');

  // nodes.tooltip().fontSize(18);
  // nodes.tooltip().background('white');
  // nodes.tooltip().fontColor('black');
  // nodes.tooltip().format('name: {%name}\nstatus: {%status}\ntype: {%purpose}');

  // const edges = chart.edges();
  // edges.normal().stroke('#7ec5ff');
  // edges.selected().stroke('#7ec5ff');
  // edges.arrows({
  //   enabled: true,
  //   size: 18,
  // });

  // chart.container('container');

  const dispatch = useAppDispatch();

  dispatch(
    setPodIntervalID(
      setInterval(() => {
        fetch('/api/pods')
          .then((res) => res.json())
          .then((res) => {
            dispatch(setData(res));
            dispatch(setLoading('none'));
          });
      }, 2000)
    )
  );

  return (
    <div
      style={{
        backgroundImage: 'linear-gradient(rgba(255, 254, 238, 0),rgba(116, 156, 133, 1),rgba(116, 156, 133, 1))',
        borderRadius: '0 0 20px 20px',
      }}
    >
      <AnyChart instance={chart} />
    </div>
  );
}
