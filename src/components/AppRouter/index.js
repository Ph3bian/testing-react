import React, { lazy, Suspense } from "react";
import { withAuth } from "utils/hoc";
import PrivateRoute from "./PrivateRoute";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { AppLoader } from "../Loader";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const Login = lazy(() => import(/* webpackChunkName: "Login" */ "pages/Login"));
const Home = lazy(() => import(/* webpackChunkName: "Home" */ "pages/Home"));
const Register = lazy(() =>
  import(/* webpackChunkName: "RegisterUser" */ "pages/RegisterUser")
);
const AppRouter = () => (
  <Router history={history}>
    <Suspense fallback={<AppLoader />}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/create-account" component={Register} />
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
