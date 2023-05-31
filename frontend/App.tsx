import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import PodsContainer from './containers/PodsContainer';
import SidebarContainer from './containers/SidebarContainer';
import styles from './stylesheets/styles.module.scss'

export default function App() {
  return (
    <>
      <SidebarContainer />
      <div className={styles.mainDiv}>
        <h1 className={styles.title}>ReKuberate</h1>
        <Routes>
          <Route path='/' element={<HomeContainer />}></Route>
          <Route path='/pods' element={<PodsContainer />}></Route>
        </Routes>
      </div>      
    </>
  );
}
