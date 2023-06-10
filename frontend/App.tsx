import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import PodsContainer from './containers/PodsContainer';
import SidebarContainer from './containers/SidebarContainer';
import styles from './stylesheets/styles.module.scss';
import MetricsContainer from './containers/MetricsContainer';
import logo from '../assets/ReKuberate-transparent.png';
import { useAppDispatch } from './store/hooks';
import { setData } from './store/appSlice';

export default function App() {  
  const dispatch = useAppDispatch();

  setInterval(() => {
    fetch('/api/pods')
      .then((res) => res.json())
      .then((res) => {
        dispatch(setData(res));
      });
  }, 2000);

  return (
    <>
      <SidebarContainer />
      <div className={styles.mainDiv}>
        <div className={styles.title}>
          <img className={styles.logo} src={logo}></img>
        </div>
        <Routes>
          <Route path="/" element={<HomeContainer />}></Route>
          <Route path="/pods" element={<PodsContainer />}></Route>
          <Route path="/metrics" element={<MetricsContainer />}></Route>
        </Routes>
      </div>
    </>
  );
}
