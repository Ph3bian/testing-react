import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../pages/Auth/Login';
import AuthContext from '../../context/AuthContext';
describe('The <Login/> component', () => {
  test('Should render correctly', () => {
    const onSubmit = jest.fn();
    const routerProps = {
      initialEntries: ['/home', '/login'],
      initialIndex: 0,
    };
    const LoginRendered = () => (
      <AuthContext.Provider
        value={{
          setAuthAndCache: jest.fn(),
        }}
      >
        <MemoryRouter {...routerProps}>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const { asFragment } = render(LoginRendered());

    expect(asFragment()).toMatchSnapshot();
  });
});
