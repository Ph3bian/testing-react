import React from 'react';
import ReactDOM from 'react-dom';
// import { axe, toHaveNoViolations } from 'jest-axe';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Login from '../../pages/Auth/Login';

describe('The <Button/> component', () => {
  const fakeUser = {
    email: 'thecarter@gmail.com',
    password: 'Freedom',
  };

  test('Should render correctly', () => {
    render(<Login />);
    userEvent.type(screen.getByLabelText(/email/i), email)
    userEvent.type(screen.getByLabelText(/password/i), password)
    userEvent.click(screen.getByRole('button', {name: /submit/i}))
  });

  test('Should render button text correctly', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    expect(getByText(/Submit/)).toBeInTheDocument();
  });

  test('Should call the onClick handler when it is provided', () => {
    const { getByText } = render(<Button {...defaultProps} />);
  });

  test("Should have class 'primary' if Button variant is primary", () => {});

  test('Should not fail any accessibility tests', async () => {});
});
