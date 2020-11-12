import React from 'react';
import ReactDOM from 'react-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render, fireEvent } from '@testing-library/react';
import Button from '../../components/Button';

describe('The <Button/> component', () => {
  expect.extend(toHaveNoViolations);

  const defaultProps = {
    type: 'button',
    onClick: jest.fn(),
    title: 'Submit',
  };

  const primaryButton = {
    type: 'button',
    onClick: jest.fn(),
    title: 'Submit',
    variant: 'primary',
  };
  test('Should render button correctly', () => {
    const { asFragment } = render(<Button {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Should render button text correctly', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    expect(getByText(/Submit/)).toBeInTheDocument();
  });

  test('Should call the onClick handler when it is provided', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    fireEvent.click(getByText(defaultProps.title));
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  test("Should have class 'primary' if Button variant is primary", () => {
    const { getByText } = render(<Button {...primaryButton} />);
    expect(getByText(/Submit/)).toHaveAttribute('class');
    expect(getByText(/Submit/).classList).toHaveLength(2)
  });

  test('Should not fail any accessibility tests', async () => {
    const { container } = render(<Button {...primaryButton} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
