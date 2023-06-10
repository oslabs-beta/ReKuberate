import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import styles from './DocsSidebarStyles.module.scss';

export default function DocsSidebar() {
  return (
    <>
      <Nav className={styles.sidebar}>
        <Nav.Link as={Link} to="/gettingStarted" className={styles.sidebarLinks}>
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/tutorial" className={styles.sidebarLinks}>
          Pods
        </Nav.Link>
        <Nav.Link as={Link} to="/help" className={styles.sidebarLinks}>
          Metrics
        </Nav.Link>
        <Nav.Link as={Link} to="/troubleShooting" className={styles.sidebarLinks}>
          Docs
        </Nav.Link>
      </Nav>
    </>
  );
}
