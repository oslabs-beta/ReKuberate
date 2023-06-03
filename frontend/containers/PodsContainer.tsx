import React from 'react';
import './PodsContainerStyles.scss';
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import { MockData } from '../types';

export default function PodsContainer() {
  const mockData: MockData = {
    nodes: [
      {
        id: 'node 1',
        node_data: 'Running',
        location: 'Philadelphia',
        normal: { fill: '#008000' },
        hovered: { fill: '#51cf51' },
        selected: { fill: '#036803' },
      },
      {
        id: 'node 2',
        node_data: 'Running',
        location: 'Boston',
        normal: { fill: '#008000' },
        hovered: { fill: '#51cf51' },
        selected: { fill: '#036803' },
      },
      {
        id: 'node 3',
        node_data: 'Running',
        location: 'San Francisco',
        normal: { fill: '#008000' },
        hovered: { fill: '#51cf51' },
        selected: { fill: '#036803' },
      },
      {
        id: 'node 4',
        node_data: 'Running',
        location: 'Los Angeles',
        normal: { fill: '#008000' },
        hovered: { fill: '#51cf51' },
        selected: { fill: '#036803' },
      },
      {
        id: 'node 5',
        node_data: 'Failed',
        location: 'Philadelphia',
        normal: { fill: '#ff0000' },
        hovered: { fill: '#fc7474' },
        selected: { fill: '#940000' },
      },
      {
        id: 'node 6',
        node_data: 'Running',
        location: 'Chicago',
        normal: { fill: '#008000' },
        hovered: { fill: '#51cf51' },
        selected: { fill: '#036803' },
      },
      {
        id: 'node 7',
        node_data: 'Pending',
        location: 'New York',
        normal: { fill: '#ffa500' },
        hovered: { fill: '#fac86a' },
        selected: { fill: '#ca8606' },
      },
    ],
    edges: [
      { from: 'node 1', to: 'node 2' },
      { from: 'node 2', to: 'node 3' },
      { from: 'node 1', to: 'node 3' },
      { from: 'node 1', to: 'node 5' },
      { from: 'node 4', to: 'node 5' },
      { from: 'node 6', to: 'node 7' },
      { from: 'node 1', to: 'node 7' },
    ],
  };

  const chart = anychart.graph(mockData);
  chart.background('#d8d8d8');

  const background = chart.background();
  background.stroke('20 #2c2c2c');
  background.cornerType('round');
  background.corners(0, 0, 10, 10);

  const nodes = chart.nodes();
  nodes.normal().height(30);
  nodes.hovered().height(45);

  nodes.labels().enabled(true);
  nodes.labels().fontSize(18);
  nodes.labels().fontColor('black');
  nodes.labels().fontWeight(900);

  nodes.tooltip().fontSize(28);
  nodes.tooltip().background('white');
  nodes.tooltip().fontColor('black');
  nodes.tooltip().format(`status: {%node_data}\nlocation: {%location}`);

  const edges = chart.edges();
  edges.normal().stroke('#7ec5ff');
  edges.selected().stroke('#7ec5ff');
  edges.arrows({
    enabled: true,
    size: 18,
  });

  chart.container('container');

  return (
    <div>
      <AnyChart instance={chart} />
    </div>
  );
}
