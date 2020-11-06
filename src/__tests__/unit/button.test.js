import React from 'react';
import ReactDOM from 'react-dom';
// import { axe, toHaveNoViolations } from 'jest-axe';
// import { render, fireEvent } from '@testing-library/react';
import Button from '../../components/Button';

describe('The <Button/> component', () => {
  //   expect.extend(toHaveNoViolations);

  const defaultProps = {
    type: 'button',
    onClick: jest.fn(),
    title: 'Submit',
  };

  test('Should render button correctly', () => {
  
  });

  test('Should render button text correctly', () => {});

  test('Should call the onClick handler when it is provided', () => {});

  test("Should have class 'primary' if Button variant is primary", () => {});

  test('Should not fail any accessibility tests', async () => {});
});
