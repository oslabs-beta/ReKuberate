import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import PodsContainer from './containers/PodsContainer';
import SidebarContainer from './containers/SidebarContainer';
import styles from './stylesheets/styles.module.scss';
import MetricsContainer from './containers/MetricsContainer';
import logo from '../assets/ReKuberate-transparent.png';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setLoggedIn } from './store/appSlice';
import LoadingWheel from './components/LoadingWheel';
import LoginContainer from './containers/LoginContainer';
import NewAccountContainer from './containers/NewAccountContainer';
import Docs from './pages/Docs';

export default function App() {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.app.loggedIn);

  useEffect(() => {
    (async () => {
      await fetch('/api/user/')
        .then((res) => res.json())
        .then((res) => {
          if (res) dispatch(setLoggedIn(true));
          else dispatch(setLoggedIn(false));
        });
    })();
  });

  return loggedIn ? (
    <>
      <LoadingWheel />
      <SidebarContainer />
      <div className={styles.mainDiv}>
        <div className={styles.title}>
          <img className={styles.logo} src={logo}></img>
        </div>
        <Routes>
          <Route path="/" element={<HomeContainer />}></Route>
          <Route path="/pods" element={<PodsContainer />}></Route>
          <Route path="/metrics" element={<MetricsContainer />}></Route>
          <Route path="/docs" element={<Docs />}></Route>
        </Routes>
      </div>
    </>
  ) : (
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
          <Route path="/docs" element={<Docs />}></Route>
        </Routes>
      </div>
    </>
  );
}
