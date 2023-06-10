import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import PodsContainer from './containers/PodsContainer';
import SidebarContainer from './containers/SidebarContainer';
import styles from './stylesheets/styles.module.scss';
import MetricsContainer from './containers/MetricsContainer';
import logo from '../assets/ReKuberate-transparent.png';
import LoginContainer from './containers/LoginContainer';
import NewAccountContainer from './containers/NewAccountContainer';

export default function App() {
  return (
    <>
      <SidebarContainer />
      <div className={styles.mainDiv}>
        <div className={styles.title}>
          <img className={styles.logo} src={logo}></img>
        </div>
        <Routes>
          <Route path="/" element={<LoginContainer />}></Route>
          <Route path="/createAccount" element={<NewAccountContainer />}></Route>
          <Route path="/home" element={<HomeContainer />}></Route>
          <Route path="/pods" element={<PodsContainer />}></Route>
          <Route path="/metrics" element={<MetricsContainer />}></Route>
        </Routes>
      </div>
    </>
  );
}
