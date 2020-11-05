const Validator= (values)=>{

    let errors = {}
    if (!values.firstName) {
      errors.firstName = 'First name is required'
    }
    if (!values.lastName) {
      errors.lastName = 'Last name is required'
    }
    if (!values.password) {
      errors.password = 'Password is required'
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Verify Password'
      }
    if (values.password && values.confirmPassword && values.password !== values.confirmPassword  ) {
      errors.confirmPassword = 'Passwords does not match'
    }
    if (!values.email) {
      errors.email = 'Email address is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Email address is invalid'
    }
    return errors
  }
export default Validator