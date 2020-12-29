import "./App.scss";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import SignUpForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import PrivateRouter from "./utils/PrivateRoute";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import PrivateRoute from "./utils/PrivateRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosWithAuth } from "./utils/axiosWithAuth";
// import Button from '@material-ui/core/Button';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function LogoutAlert(props) {
  return <MuiAlert elevation={8} variant="filled" {...props} />;
}

function App() {
  const [open, setOpen] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const checkUserLogin = () => {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      const user = localStorage.getItem("user");

      axiosWithAuth()
        .get(`users/${user}`)
        .then((res) => {
          dispatch({ type: "LOGGED_IN" });
        })
        .catch((err) => {
          console.log("NOT LOGGED IN");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          dispatch({ type: "LOGGED_OUT" });
        });
    } else {
      console.log("NOT LOGGED IN");
      dispatch({ type: "LOGGED_OUT" });
    }
  };

  useEffect(() => {
    checkUserLogin();
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleLogoutClick = () => {
    setLogoutSuccess(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleLogoutClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setLogoutSuccess(false);
  };

  return (
    <Router>
      {/* BUTTON TO TEST SNACKBAR */}
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success
      </Button> */}

      <div className="App">
        {/* test note */}
        <Switch>
          <Redirect exact from="/" to="/register" />
          {isLoggedIn ? (
            <Redirect exact from="/register" to="/dashboard" />
          ) : (
            <Route path="/register">
              <div className="background-signup">
                <div className="new-accent">
                  <div className="signup-page">
                    <div className="form">
                      <h1 className="form-title">Tracker.io</h1>
                      <h3>Signup free today!</h3>
                      <SignUpForm handleClick={handleClick} />
                    </div>
                    <div className="signup-img">
                      <div className="signup-img-overlay" />
                      <div className="signup-prof-img"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Route>
          )}

          {isLoggedIn ? (
            <Redirect exact from="/login" to="/dashboard" />
          ) : (
            <Route path="/login">
              <div className="login-form">
                <div className="login-content">
                  <h1 className="form-title">Tracker.io</h1>
                  <h3>Login</h3>
                  <LoginForm />
                </div>
              </div>
            </Route>
          )}

          {isLoggedIn ? (
            <PrivateRoute
              handleLogoutClick={handleLogoutClick}
              path="/dashboard"
              component={Dashboard}
            />
          ) : (
            <Redirect from="/dashboard" to="/login" />
          )}
          {/* <Dashboard handleLogoutClick={handleLogoutClick} /> */}
        </Switch>

        {/* SUCCESS MESSAGE */}
        <Snackbar open={open} autoHideDuration={7000} onClose={handleClose}>
          <Alert
            style={{
              fontSize: "1.2rem",
              width: "120%",
              backgroundColor: "lightgreen",
              color: "black",
            }}
            onClose={handleClose}
            severity="success"
          >
            Account successfully created!
          </Alert>
        </Snackbar>

        <Snackbar
          open={logoutSuccess}
          autoHideDuration={6000}
          onClose={handleLogoutClose}
        >
          <LogoutAlert
            style={{
              fontSize: "1.2rem",
              width: "120%",
              backgroundColor: "lightgreen",
              color: "black",
            }}
            onClose={handleClose}
            severity="success"
          >
            Successfully logged out.
          </LogoutAlert>
        </Snackbar>
      </div>
    </Router>
  );
}

export default App;
