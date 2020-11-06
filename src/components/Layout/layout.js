import React from 'react';
import { MenuIcon, CogIcon } from 'evergreen-ui';
import styles from './layout.module.scss';
const PrivateLayout = ({ children }) => {
  return (
    <div className={styles.Private}>
      <div className={styles.PrivateSide}>
        <div className={styles.PrivateSideLogo}>
          <MenuIcon />
        </div>
        <div />
        <div className={styles.PrivateSideFooter}>
          <CogIcon />
        </div>
      </div>
      <div className={styles.PrivateMain}>{children}</div>
    </div>
  );
};

export default PrivateLayout;
