import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import styles from './DocsSidebarStyles.module.scss';

export default function DocsSidebar() {
  return (
    <>
      <Nav className={styles.sidebar}>
        <Nav.Link as={Link} to="/gettingStarted" className={styles.sidebarLinks}>
          Getting Started
        </Nav.Link>
        <Nav.Link as={Link} to="/tutorial" className={styles.sidebarLinks}>
          Tutorials
        </Nav.Link>
        <Nav.Link as={Link} to="/help" className={styles.sidebarLinks}>
          Help
        </Nav.Link>
        <Nav.Link as={Link} to="/troubleShooting" className={styles.sidebarLinks}>
          Trouble Shooting
        </Nav.Link>
      </Nav>
    </>
  );
}
