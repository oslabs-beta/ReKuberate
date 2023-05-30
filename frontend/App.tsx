import React from 'react';

import { Route, Routes } from 'react-router-dom';
import MainContainer from './containers/MainContainer';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<MainContainer />}></Route>
    </Routes>
  );
}
