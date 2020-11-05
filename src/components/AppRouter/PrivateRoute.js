import React  from 'react'
import { Route, Redirect } from 'react-router-dom'
import ErrorBoundary from '../ErrorBoundary'
import PrivateLayout from '../Layout/layout'

const PrivateRoute = ({
  component: Component,
  title,
  renderHeader,
  ...rest
}) => {
  const isAuthenticated = localStorage.getItem('authToken') ? true : false

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <ErrorBoundary>
            <PrivateLayout>
              <Component {...props} />
            </PrivateLayout>
          </ErrorBoundary>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

export default PrivateRoute
