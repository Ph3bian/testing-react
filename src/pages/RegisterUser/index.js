import React, { useState } from "react";
import { Input, Button } from "components";
import { validator } from "./validation";
import styles from "register-user.module.scss";

const UserDetails = () => {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const handleUser = ({ target: { value, name } }) => {
    return setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validator(user);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
  };
  return (
    <form onSubmit={handleSubmit} className={styles.RegisterForm}>
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

      <Input
        type="email"
        label="Email address"
        name="email"
        value={user.email}
        onChange={(e) => handleUser(e)}
        error={errors.email}
      />
      <Button type="submit"> Continue</Button>
    </form>
  );
};

export default UserDetails;
