import React from "react";
import Nav from 'react-bootstrap/Nav';
import styles from './SidebarContainerStyles.module.scss'

export default function SidebarContainer() {
  return (
    <Nav className={styles.sidebar}>
      <Nav.Link href="/" className={styles.sidebarLinks}>Home</Nav.Link>
      <Nav.Link href="/pods" className={styles.sidebarLinks}>Pods</Nav.Link>
      <Nav.Link href="/metrics" className={styles.sidebarLinks}>Metrics</Nav.Link>
    </Nav>
  )
}