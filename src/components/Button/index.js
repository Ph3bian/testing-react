import React from 'react';
import styles from './button.module.scss';

const Button = ({ type, children, onClick, isLoading, variant, title }) => (
  <button
    type={type ? type : 'button'}
    onClick={onClick}
    className={[styles['Button'], variant && styles[`${variant}`]].join(' ')}
    disabled={isLoading}
  >
    {isLoading ? 'Loading...' : title ? title : children}
  </button>
);
export default Button;
