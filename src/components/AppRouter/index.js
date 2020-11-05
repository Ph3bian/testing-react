import  React, { lazy, Suspense } from 'react'
import { withAuth } from 'utils/hoc'
import PrivateRoute from './PrivateRoute'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { AppLoader } from '../Loader'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const Login = lazy(() => import(/* webpackChunkName: "Login" */ 'pages/Login'))
const Home = lazy(() => import(/* webpackChunkName: "Home" */ 'pages/Home'))

const AppRouter = () => (
  <Router history={history}>
    <Suspense fallback={<AppLoader />}>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/home" exact component={Home} />
        <PrivateRoute
          path="/"
          exact
          component={() => <Redirect to="/home" />}
        />
      </Switch>
    </Suspense>
  </Router>
)
export default withAuth(AppRouter)
