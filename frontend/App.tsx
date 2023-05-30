import React from 'react';

import { Route, Routes } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import SidebarContainer from './containers/SidebarContainer';

export default function App() {
  return (
    <>
      <SidebarContainer />
      <Routes>
        <Route path='/' element={<HomeContainer />}></Route>
      </Routes>
    </>
  );
}
