import React from 'react';
import Nav from 'react-bootstrap/Nav';
import styles from './DocsStyles.module.scss';

// Navigation and transition for documentation subpage
export default function DocsSidebar() {
  function transition(id: string) {
    const ids = ['#introduction', '#about', '#installation', '#built'];
    document.querySelector<HTMLElement>(id).style.opacity = '1';
    document.querySelector<HTMLElement>(id).style.zIndex = '99';

    for (let i = 0; i < ids.length; i++) {
      if (id !== ids[i]) {
        document.querySelector<HTMLElement>(ids[i]).style.opacity = '0';
        document.querySelector<HTMLElement>(ids[i]).style.zIndex = '1';
      }
    }
  }

  return (
    <>
      <Nav className={styles.sidebar}>
        <Nav.Link onClick={() => transition('#introduction')} className={styles.sidebarLinks}>
          Introduction
        </Nav.Link>
        <Nav.Link onClick={() => transition('#about')} className={styles.sidebarLinks}>
          About
        </Nav.Link>
        <Nav.Link onClick={() => transition('#installation')} className={styles.sidebarLinks}>
          Installation
        </Nav.Link>
        <Nav.Link onClick={() => transition('#built')} className={styles.sidebarLinks}>
          Built with <p style={{ color: 'red', display: 'inline' }}>♥</p>
        </Nav.Link>
      </Nav>
    </>
  );
}
