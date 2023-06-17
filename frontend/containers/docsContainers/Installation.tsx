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
        <p>7. Enjoy!</p>
        <p>
          8. If the metrics do not load but the boxes appear, try going to http://localhost:9000 and logging in with
          **username:** admin, **password:** prom-operator
        </p>
      </div>
    </>
  );
}
