import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import PodsContainer from './containers/PodsContainer';
import SidebarContainer from './containers/SidebarContainer';
import styles from './stylesheets/styles.module.scss';
import MetricsContainer from './containers/MetricsContainer';
import logo from '../assets/ReKuberate-transparent.png';
import { useAppDispatch } from './store/hooks';
import { setData, setPodIntervalID } from './store/appSlice';
import LoadingWheel from './components/LoadingWheel';
import LoginContainer from './containers/LoginContainer';
import NewAccountContainer from './containers/NewAccountContainer';
import Docs from './pages/Docs';

export default function App() {
  const dispatch = useAppDispatch();

  dispatch(
    setPodIntervalID(
      setInterval(() => {
        fetch('/api/pods')
          .then((res) => res.json())
          .then((res) => {
            dispatch(setData(res));
          });
      }, 2000)
    )
  );

  return (
    <>
      <LoadingWheel />
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
          <Route path="/docs" element={<Docs />}></Route>
        </Routes>
      </div>
    </>
  );
}
