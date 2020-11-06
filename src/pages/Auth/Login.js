import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toaster } from 'evergreen-ui';
import AuthContext from 'context/AuthContext';
import Input from 'components/Input';
import Button from 'components/Button';
import { loginValidator } from './validation';
import styles from './auth.module.scss';
import { loginUser } from 'services/auth';
const Login = ({ history }) => {
  const {setAuthAndCache} = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    password: '',
    email: '',
  });

  const handleUser = ({ target: { value, name } }) => {
    return setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = loginValidator(user);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setLoading(true);
    try {
      const res = await loginUser(user);
      if (res) {
        setLoading(false);
        console.log(res);
        toaster.success('Create device successful');
        setAuthAndCache(res.data)
        history.push('/home');
        return;
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
        <Button type="submit" isLoading={loading}>
          {' '}
          Submit
        </Button>
        <Link to="/create-account"> Don't have an Account? Register</Link>
      </div>
    </form>
  );
};

export default Login;
