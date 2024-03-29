import React from 'react';
import Nav from 'react-bootstrap/Nav';
import styles from './SidebarContainerStyles.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setColorTheme, setLoggedIn } from '../store/appSlice';

export default function SidebarContainer() {
  const colorTheme = useAppSelector((state) => state.app.colorTheme);
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.app.loggedIn);
  const podsIntervalID = useAppSelector((state) => state.app.podIntervalID);
  const navigate = useNavigate();
  let sideBar = [];

  //check if darkmode is enabled and udpate colorTheme state if it is
  if (window.matchMedia('(prefers-color-scheme: dark)').matches && colorTheme === null) {
    dispatch(setColorTheme('dark'));
  }

  //assign color of body to the current color theme stored in state
  document.querySelector('body').setAttribute('theme', colorTheme);

  //if user is logged in, assign sidebar array to render routes for all sidebar links and add logout functionality to logout button.
  //Else only render routes for login and docs
  sideBar = loggedIn
    ? [
      <Nav.Link as={Link} to="/" className={styles.sidebarLinks}>
          Home
      </Nav.Link>,
      <Nav.Link as={Link} to="/pods" className={styles.sidebarLinks}>
          Pods
      </Nav.Link>,
      <Nav.Link as={Link} to="/d3" className={styles.sidebarLinks}>
          D3
      </Nav.Link>,
      <Nav.Link as={Link} to="/metrics" className={styles.sidebarLinks}>
          Metrics
      </Nav.Link>,
      <Nav.Link as={Link} to="/docs" className={styles.sidebarLinks}>
          Docs
      </Nav.Link>,
      <button
        onClick={async () => {
          await fetch('/api/user/logout');
          dispatch(setLoggedIn(false));
          clearInterval(podsIntervalID);
          navigate('/');
        }}
        className={styles.loggedIn}
      >
          Logout
      </button>,
    ]
    : [
      <Nav.Link as={Link} to="/" className={`${styles.sidebarLinks} ${styles.loginLink}`}>
          Login
      </Nav.Link>,
      <Nav.Link as={Link} to="/docs" className={styles.sidebarLinks}>
          Docs
      </Nav.Link>,
    ];

  //render sidebar and darkmode button with functionality
  return (
    <Nav className={styles.sidebar}>
      {sideBar}
      <button
        onClick={() => {
          colorTheme === 'dark' ? dispatch(setColorTheme('light')) : dispatch(setColorTheme('dark'));
        }}
        className={styles.darkmode}
      >
        Dark Mode
      </button>
    </Nav>
  );
}
