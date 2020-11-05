import React, { lazy, Suspense } from "react";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { withAuth } from "utils/hoc";
import { Router,  Switch, Redirect } from "react-router-dom";
import AppLoader  from "../Loader/AppLoader";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const Login = lazy(() => import(/* webpackChunkName: "Login" */ "pages/Auth/Login"));
const Home = lazy(() => import(/* webpackChunkName: "Home" */ "pages/Home"));
const Register = lazy(() =>
  import(/* webpackChunkName: "RegisterUser" */ "pages/Auth/RegisterUser")
);
const AppRouter = () => (
  <Router history={history}>
    <Suspense fallback={<AppLoader />}>
      <Switch>
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/create-account" component={Register} />
        <PrivateRoute path="/home" exact component={Home} />
        <PrivateRoute
          path="/"
          exact
          component={() => <Redirect to="/home" />}
        />
        <PrivateRoute
          path="/"
          exact
          component={() => <Redirect to="/home" />}
        />
      </Switch>
    </Suspense>
  </Router>
);
export default withAuth(AppRouter);
