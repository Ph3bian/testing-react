import React from 'react';
import styles from './button.module.scss';

const Button = ({ type, children, onClick, isLoading }) => (
  <button
    type={type}
    onClick={onClick}
    className={styles.Button}
    disabled={isLoading}
  >
    {isLoading ? 'Loading...' : children }
  </button>
);
export default Button;
