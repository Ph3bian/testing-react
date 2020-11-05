import React, { useState } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import { loginValidator } from './validation';
import styles from './auth.module.scss';

const UserDetails = () => {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    password: '',
    email: '',
  });

  const handleUser = ({ target: { value, name } }) => {
    return setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = loginValidator(user);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
    
  };
  return (
    <form onSubmit={handleSubmit} className={styles.Auth}>
      <h3>Welcome Back</h3>
      <div className={styles.AuthBody}>
      <Input
        type="email"
        label="Email address"
        name="email"
        value={user.email}
        onChange={(e) => handleUser(e)}
        error={errors.email}
      />
      <Input
        type="password"
        label="Password"
        name="password"
        value={user.password}
        onChange={(e) => handleUser(e)}
        error={errors.password}
      />
      </div>
      <div className={styles.AuthFooter}>
        <Button type="submit"> Submit</Button>
      </div>
    </form>
  );
};

export default UserDetails;
