import React from "react";
import wheel from "./pictures/wheel.png";
import kub from "./pictures/kubernetes.svg";
import "../CSS/App.css";

export default function HomePage() {
  return (
    <>
      <div>
        <header className="App-header">
          <img src={wheel} className="App-logo" alt="logo" />
        </header>
        <h1>Introducing ReKuberate 1.0</h1>
      </div>
      <div className="key-features">
        <h1 className="first-comp">
          Presenting ReKuberate's Powerful Kubernetes Pod's Visualizer and
          Metrics Display
        </h1>
        <div className="Pods-demo">
          <div className="Pods-description">
            Displaying an aesthic GUI that allows the user to interact with
            their cluster and view their cluster health real-time. Color
            variations allowing the user to see current pods that active,
            pending or down
          </div>
          <div>
            <img src={kub} className="demo" />
          </div>
        </div>
        <div className="metrics">
          <div>
            <img src={kub} className="demo" />
          </div>
          <div className="metrics-description">
            Displaying a real-time grafana rendered graphs illustrating the unique local health metrices of your operating system while also tracking analytically the operating pods and containers
          </div>
        </div>
      </div>
      <div className="techStack">

      </div>
    </>
  );
}
