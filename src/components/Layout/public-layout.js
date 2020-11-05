import React from "react";
import styles from "./layout.module.scss";
const PublicLayout = ({ children }) => {
  return (
    <div className={styles.Public}>
      <div className={styles.header}>My Journal</div>
      <div className={styles.body}>
        <div className={styles.bodyCard}>
          {children}
        
        </div>
      </div>
      <div className={styles.footer}>
        <p>My Journal. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default PublicLayout;
