import React from 'react';
import styles from './DocsStyles.module.scss';

export default function Installation() {
  return (
    <>
      <div className={styles.docs} id="installation">
        <p style={{ fontWeight: 600 }}>Installation is incredible simple</p>
        <p>1. Head over to ReKuberate.org</p>
        <p>2. Click on download</p>
        <p>3. Extract the zip file</p>
        <p>4. Open the extracted folder in VSCode</p>
        <p>5. Install dependencies with 'npm install'</p>
        <p>6. Start the application with 'npm run electron'</p>
        <p>7. If this is your first time using ReKuberate, visit <a href="http://localhost:9000">http://localhost:9000</a> and login 
        using admin and prom-operator as the username and password</p>
        <p>8. Enjoy!</p>
      </div>
    </>
  );
}
