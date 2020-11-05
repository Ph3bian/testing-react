import React from "react";
import styles from "./layout.module.scss";
const PrivateLayout = ({ children }) => {
  return <div className={styles.Private}>{children}</div>;
};

export default PrivateLayout;
