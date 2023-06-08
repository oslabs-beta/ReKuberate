import React from "react";
import "./PodsContainerStyles.scss";
import AnyChart from "anychart-react";
import anychart from "anychart";
import { MockData } from "../types";
import { useAppSelector } from "../store/hooks";

export default function PodsContainer() {
  const data: any = useAppSelector((state) => state.app.data);
  const firstKey = Object.keys(data)[0];

  const chartData: MockData = {
    nodes: [],
    edges: [],
  };

  for (let key in data) {
    if (data[key].host === "Running") {
      chartData.nodes.push({
        id: key,
        name: key,
        nodeName: key,
        status: data[key].host,
        purpose: data[key].type,
        normal: { fill: "#008000" },
        hovered: { fill: "#51cf51" },
        selected: { fill: "#036803" },
      });
    } else if (data[key].host === "Pending") {
      chartData.nodes.push({
        id: key,
        name: key,
        nodeName: key,
        status: data[key].host,
        purpose: data[key].type,
        normal: { fill: "#ffa500" },
        hovered: { fill: "#fac86a" },
        selected: { fill: "#ca8606" },
      });
    } else {
      chartData.nodes.push({
        id: key,
        name: key,
        nodeName: key,
        status: data[key].host,
        purpose: data[key].type,
        normal: { fill: "#ff0000" },
        hovered: { fill: "#fc7474" },
        selected: { fill: "#940000" },
      });
    }
    for (let i = 0; i < data[key].pods.length; i++) {
      if (data[key].pods[i].status === "Running") {
        chartData.nodes.push({
          id: `${key}-${i}`,
          name: data[key].pods[i].name,
          status: data[key].pods[i].status,
          purpose: "Pod",
          normal: { fill: "#008000" },
          hovered: { fill: "#51cf51" },
          selected: { fill: "#036803" },
        });
      } else if (data[key].pods[i].status === "Pending") {
        chartData.nodes.push({
          id: `${key}-${i}`,
          name: data[key].pods[i].name,
          status: data[key].pods[i].status,
          purpose: "Pod",
          normal: { fill: "#ffa500" },
          hovered: { fill: "#fac86a" },
          selected: { fill: "#ca8606" },
        });
      } else {
        chartData.nodes.push({
          id: `${key}-${i}`,
          name: data[key].pods[i].name,
          status: data[key].pods[i].status,
          purpose: "Pod",
          normal: { fill: "#ff0000" },
          hovered: { fill: "#fc7474" },
          selected: { fill: "#940000" },
        });
      }
      chartData.edges.push({ from: key, to: `${key}-${i}` });
    }
    chartData.edges.push({ from: firstKey, to: key });
  }

  const chart = anychart.graph(chartData);
  chart.background("#d8d8d8");

  const background = chart.background();
  background.stroke({
    keys: ["#749c85", "#749c85", "#749c85", "#fffeee"],
    thickness: 20,
    angle: 90,
  });
  background.cornerType("round");
  background.corners(0, 0, 10, 10);

  const nodes = chart.nodes();
  nodes.normal().height(30);
  nodes.hovered().height(45);

  nodes.labels().enabled(true);
  nodes.labels().format("{%nodeName}");
  nodes.labels().fontSize(12);
  nodes.labels().fontWeight(600);
  nodes.labels().fontColor("black");

  nodes.tooltip().fontSize(18);
  nodes.tooltip().background("white");
  nodes.tooltip().fontColor("black");
  nodes.tooltip().format(`name: {%name}\nstatus: {%status}\ntype: {%purpose}`);

  const edges = chart.edges();
  edges.normal().stroke("#7ec5ff");
  edges.selected().stroke("#7ec5ff");
  edges.arrows({
    enabled: true,
    size: 18,
  });

  chart.container("container");

  return (
    <div>
      <AnyChart instance={chart} />
    </div>
  );
}
