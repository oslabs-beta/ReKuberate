import React from "react";
import './PodsContainerStyles.scss';
import AnyChart from "anychart-react";
import anychart from "anychart";

export default function PodsContainer() {
    const mockData = {
      "nodes": [{"id": "1"}, {"id": "2"}, {"id": "3"}, {"id": "4"}, {"id": "5"}, {"id": "6"}, {"id": "7"}],
      "edges": [{"from": "1", "to": "2"}, {"from": "2", "to": "3"}, {"from": "1", "to": "3"}, {"from": "1", "to": "5"}, {"from": "4", "to": "5"}, {"from": "6", "to": "7"}, {"from": "1", "to": "7"}]
  }

  const chart = anychart.graph(mockData);

  const nodes = chart.nodes();
  nodes.normal().height(30);
  nodes.hovered().height(45);
  nodes.selected().height(45);
 
  nodes.normal().stroke(null);
  nodes.normal().fill("#ffa000");
  nodes.hovered().stroke("#333333", 3);
  nodes.selected().stroke("#333333", 3);
  nodes.selected()
  chart.nodes().labels().enabled(true);

  chart.nodes().labels().fontSize(12);
  chart.nodes().labels().fontWeight(600);

  chart.container("container");

  return (
    <div>
      <AnyChart instance={chart} />
    </div>
    
  )
}