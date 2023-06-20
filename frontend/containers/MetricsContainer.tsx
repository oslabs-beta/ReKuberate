import React from 'react';
import './MetricsContainerStyles.scss';
import { useAppSelector } from '../store/hooks';

//create and export MetricsContainer functional componenet
export default function MetricsContainer() {
  //access URLs state and assign to URLs variable
  const URLs = useAppSelector((state) => state.app.URLs);
  //access podIntervalID state and assign to podIntervalID variable
  const podsIntervalID = useAppSelector((state) => state.app.podIntervalID);
  //clear podsIntervalID
  clearInterval(podsIntervalID);

  if (!URLs.availability)
    return (
      <>
        <p className="error">Error in retrieving metrics. Please try resubmitting.</p>
      </>
    );
  return (
    <div className="bigDiv">
      <div
        className="memoryDiv"
        dangerouslySetInnerHTML={{
          __html: `${URLs.memUsageDial.slice(0, 7)} class='memory' ${URLs.memUsageDial.slice(8)}`,
        }}
      ></div>
      <div
        className="runningDiv"
        dangerouslySetInnerHTML={{
          __html: `${URLs.numOfKublets.slice(0, 7)} class='running' ${URLs.numOfKublets.slice(8)}${URLs.numOfPods.slice(
            0,
            7
          )} class='running' ${URLs.numOfPods.slice(8)}${URLs.numOfContainers.slice(
            0,
            7
          )} class='running' ${URLs.numOfContainers.slice(8)}`,
        }}
      ></div>
      <div
        dangerouslySetInnerHTML={{
          __html: `${URLs.availability.slice(0, 7)} class='metrics' ${URLs.availability.slice(
            8
          )}${URLs.errorBudget.slice(0, 7)} class='metrics' ${URLs.errorBudget.slice(8)}${URLs.memUsageGraph.slice(
            0,
            7
          )} class='metrics' ${URLs.memUsageGraph.slice(8)}${URLs.cpuUsage.slice(
            0,
            7
          )} class='metrics' ${URLs.cpuUsage.slice(8)}`,
        }}
      ></div>
    </div>
  );
}
