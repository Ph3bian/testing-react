import React, { useState } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import { Validator } from './validation';
import styles from './auth.module.scss';

const UserDetails = () => {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const handleUser = ({ target: { value, name } }) => {
    return setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = Validator(user);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
  };
  return (
    <form onSubmit={handleSubmit} className={styles.Auth}>
      <h3>Create Account</h3>
      <div className={styles.AuthBody}>
        <div className={styles.isTwo}>
          <Input
            type="text"
            name="firstName"
            value={user.firstName}
            label="First name"
            onChange={(e) => handleUser(e)}
            error={errors.firstName}
          />

          <Input
            type="text"
            name="lastName"
            value={user.lastName}
            label="Last name"
            onChange={(e) => handleUser(e)}
            error={errors.lastName}
          />
        </div>

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
        <Input
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={(e) => handleUser(e)}
          error={errors.confirmPassword}
        />
      </div>
      <div className={styles.AuthFooter}>
        <Button type="submit"> Submit</Button>
      </div>
    </form>
  );
};

export default UserDetails;
