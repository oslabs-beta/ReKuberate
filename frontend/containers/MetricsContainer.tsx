import React from "react";
import "./MetricsContainerStyles.scss";
import { useAppSelector } from "../store/hooks";

export default function MetricsContainer() {
  // const URLs = useAppSelector((state) => state.app.URLs);

  const URLs = {
    numOfKublets:
      '<iframe src="http://localhost:9000/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=10s&from=1686240893753&to=1686244493753&panelId=2" width="450" height="200" frameborder="0"></iframe>',
    numOfPods:
      '<iframe src="http://localhost:9000/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=10s&from=1686240894838&to=1686244494838&panelId=3" width="450" height="200" frameborder="0"></iframe>',
    numOfContainers:
      '<iframe src="http://localhost:9000/d-solo/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=10s&from=1686240895929&to=1686244495929&panelId=4" width="450" height="200" frameborder="0"></iframe>',
    cpuUsage:
      '<iframe src="http://localhost:9000/d-solo/de5c3915-4e03-41ef-8150-9e9035de89af/node-exporter-nodes?orgId=1&refresh=30s&from=1686240899164&to=1686244499164&panelId=2" width="450" height="200" frameborder="0"></iframe>',
    memUsageGraph:
      '<iframe src="http://localhost:9000/d-solo/de5c3915-4e03-41ef-8150-9e9035de89af/node-exporter-nodes?orgId=1&refresh=30s&from=1686240900518&to=1686244500518&panelId=4" width="450" height="200" frameborder="0"></iframe>',
    memUsageDial:
      '<iframe src="http://localhost:9000/d-solo/de5c3915-4e03-41ef-8150-9e9035de89af/node-exporter-nodes?orgId=1&refresh=30s&from=1686240901855&to=1686244501855&panelId=5" width="450" height="200" frameborder="0"></iframe>',
    availability:
      '<iframe src="http://localhost:9000/d-solo/09ec8aa1e996d6ffcd6817bbaff4db1b/kubernetes-api-server?orgId=1&refresh=10s&from=1686240905226&to=1686244505226&panelId=3" width="450" height="200" frameborder="0"></iframe>',
    errorBudget:
      '<iframe src="http://localhost:9000/d-solo/09ec8aa1e996d6ffcd6817bbaff4db1b/kubernetes-api-server?orgId=1&refresh=10s&from=1686240906565&to=1686244506565&panelId=4" width="450" height="200" frameborder="0"></iframe>',
  };

  return (
    <div className="bigDiv">
      <div
        className="memoryDiv"
        dangerouslySetInnerHTML={{
          __html: `${URLs.memUsageDial.slice(
            0,
            7
          )} class='memory' ${URLs.memUsageDial.slice(8)}`,
        }}
      ></div>
      <div
        className="runningDiv"
        dangerouslySetInnerHTML={{
          __html: `${URLs.numOfKublets.slice(
            0,
            7
          )} class='running' ${URLs.numOfKublets.slice(
            8
          )}${URLs.numOfPods.slice(
            0,
            7
          )} class='running' ${URLs.numOfPods.slice(
            8
          )}${URLs.numOfContainers.slice(
            0,
            7
          )} class='running' ${URLs.numOfContainers.slice(8)}`,
        }}
      ></div>
      <div
        dangerouslySetInnerHTML={{
          __html: `${URLs.availability.slice(
            0,
            7
          )} class='metrics' ${URLs.availability.slice(
            8
          )}${URLs.errorBudget.slice(
            0,
            7
          )} class='metrics' ${URLs.errorBudget.slice(
            8
          )}${URLs.memUsageGraph.slice(
            0,
            7
          )} class='metrics' ${URLs.memUsageGraph.slice(
            8
          )}${URLs.cpuUsage.slice(0, 7)} class='metrics' ${URLs.cpuUsage.slice(
            8
          )}`,
        }}
      ></div>
    </div>
  );
}
