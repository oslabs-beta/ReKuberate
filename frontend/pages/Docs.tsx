import React from 'react';
import DocsSidebar from '../containers/docsContainers/DocsSidebar';
import { useAppSelector } from '../store/hooks';
import Installation from '../containers/docsContainers/Installation';
import Introduction from '../containers/docsContainers/Introduction';
import About from '../containers/docsContainers/About';
import Built from '../containers/docsContainers/Built';

export default function Docs() {
  const podsIntervalID = useAppSelector((state) => state.app.podIntervalID);
  clearInterval(podsIntervalID);

  return (
    <>
      <DocsSidebar />
      <Introduction />
      <About />
      <Installation />
      <Built />
    </>
  );
}
