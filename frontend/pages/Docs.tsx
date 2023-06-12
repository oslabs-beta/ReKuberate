import React from 'react';
import DocsSidebar from '../containers/docsContainers/DocsSidebar';
import { useAppSelector } from '../store/hooks';

export default function Docs() {
  const podsIntervalID = useAppSelector((state) => state.app.podIntervalID);
  clearInterval(podsIntervalID);

  return (
    <>
      <DocsSidebar />
    </>
  );
}
