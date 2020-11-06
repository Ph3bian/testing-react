import React, {useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toaster } from "evergreen-ui"
import AuthContext from 'context/AuthContext';
import Input from 'components/Input';

import Button from 'components/Button';
import { Validator } from './validation';
import styles from './auth.module.scss';
import { registerUser } from 'services/auth';

const RegisterUser = ({history}) => {
  const {setAuthAndCache} = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = Validator(user);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setLoading(true);
    try {
      const {confirmPassword, ...data}=user
      const res = await registerUser(data);
      if (res) {
        setLoading(false);
        setAuthAndCache(res.data)
        toaster.success('Create device successful');
        history.push("home")
      } else {
        toaster.danger('Create device failed');
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      toaster.danger('Create device failed');
    }
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
        <Button type="submit" isLoading={loading}>
          Submit
        </Button>
        <Link to="/login"> Sign in? </Link>
      </div>
    </form>
  );
};

export default RegisterUser;
