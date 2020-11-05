import React  from 'react'
import { Route } from 'react-router-dom'
import ErrorBoundary from '../ErrorBoundary'
import PublicLayout from '../Layout/public-layout'

const PublicRoute = ({
  component: Component,
  title,
  renderHeader,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => (
          <ErrorBoundary>
            <PublicLayout>
              <Component {...props} />
            </PublicLayout>
          </ErrorBoundary>
        ) 
      }
    />
  )
}

export default PublicRoute
