import React from "react";
import Nav from "react-bootstrap/Nav";
import styles from "./SidebarContainerStyles.module.scss";
import { Link } from "react-router-dom";

export default function SidebarContainer() {
  return (
    <Nav className={styles.sidebar}>
      <Nav.Link as={Link} to="/" className={styles.sidebarLinks}>
        Home
      </Nav.Link>
      <Nav.Link as={Link} to="/pods" className={styles.sidebarLinks}>
        Pods
      </Nav.Link>
      <Nav.Link as={Link} to="/metrics" className={styles.sidebarLinks}>
        Metrics
      </Nav.Link>
    </Nav>
  );
}
