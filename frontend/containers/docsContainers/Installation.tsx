import React from 'react';
import styles from './DocsStyles.module.scss';

export default function Installation() {
  return (
    <>
      <div className={styles.docs} id="installation">
        <p>1. Head over to ReKuberate.org</p>
        <p>2. Click on download</p>
        <p>3. Extract the zip file</p>
        <p>4. Make sure Helm is installed locally</p>
        <p>5. Open the extracted folder in VSCode</p>
        <p>6. Install dependencies with 'npm install'</p>
        <p>7. Start the application with 'npm run electron'</p>
        <p>8. If this is your first time using ReKuberate, visit <a href="http://localhost:9000">http://localhost:9000</a> and login 
        using admin and prom-operator as the username and password</p>
        <p>9. Enjoy!</p>
      </div>
    </>
  );
}
