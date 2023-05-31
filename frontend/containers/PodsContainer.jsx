import React from 'react';
import './PodsContainerStyles.scss';
import AnyChart from 'anychart-react';
import anychart from 'anychart';

export default function PodsContainer() {
  const mockData = {
    nodes: [
      {
        id: 'node 1',
        node_data: 'Running',
        normal: { fill: '#008000' },
        hovered: { fill: '#51cf51' },
        selected: { fill: '#036803' },
      },
      {
        id: 'node 2',
        node_data: 'Running',
        normal: { fill: '#008000' },
        hovered: { fill: '#51cf51' },
        selected: { fill: '#036803' },
      },
      {
        id: 'node 3',
        node_data: 'Running',
        normal: { fill: '#008000' },
        hovered: { fill: '#51cf51' },
        selected: { fill: '#036803' },
      },
      {
        id: 'node 4',
        node_data: 'Running',
        normal: { fill: '#008000' },
        hovered: { fill: '#51cf51' },
        selected: { fill: '#036803' },
      },
      {
        id: 'node 5',
        node_data: 'Failed',
        normal: { fill: '#ff0000' },
        hovered: { fill: '#fc7474' },
        selected: { fill: '#940000' },
      },
      {
        id: 'node 6',
        node_data: 'Running',
        normal: { fill: '#008000' },
        hovered: { fill: '#51cf51' },
        selected: { fill: '#036803' },
      },
      {
        id: 'node 7',
        node_data: 'Pending',
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
  background.stroke('25 #929292');
  background.cornerType('round');
  background.corners(15);

  const nodes = chart.nodes();
  nodes.normal().height(30);
  nodes.hovered().height(45);

  nodes.labels().enabled(true);
  nodes.labels().fontSize(18);
  nodes.labels().fontColor('black');
  nodes.labels().fontWeight(900);
  nodes.labels().background('white');

  nodes.tooltip().fontSize(36);
  nodes.tooltip().background('white');
  nodes.tooltip().fontColor('black');
  nodes.tooltip().format('{%node_data}');

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
