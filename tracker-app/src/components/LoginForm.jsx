import React, { useState } from "react";
import { theme } from "../styles/theme";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert } from "@material-ui/lab";
import axios from "axios";

import { useDispatch } from 'react-redux'
import { userLogin } from '../actions/index';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { loginErrorCheck } from "./errorHandle";

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    margin: "auto",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  field: {
    outlineColor: "#7000ff",
    color: "red",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "white",
    backgroundColor: "#7000ff",
    "&:hover": {
      backgroundColor: "#5d00d6",
    },
    "&:active": {
      backgroundColor: "#7000ff",
    },
  },
  buttonSuccess: {
    margin: theme.spacing(3, 0, 2),
    color: "white",
    backgroundColor: "#7000ff",
    "&:hover": {
      backgroundColor: "#5d00d6",
    },
    "&:active": {
      backgroundColor: "#7000ff",
    },
  },
  buttonProgress: {
    color: "gray",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  errorMain: {
    color: "red",
    fontSize: ".7rem",
    textAlign: "center",
    margin: "0",
    padding: "0",
    width: "100%",
    paddingTop: "25px",
  },
  fieldError: {},
}));

export default function LoginForm(props) {
  const classes = useStyles(theme);
  const history = useHistory();
  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
    isSub: false,
  });
  const [isError, setIsError] = useState({
    e: false,
    p: false,
    err: false,
    msg: {},
  });

  const handleInput = (info) => {
    setLogin({
      ...login,
      [info.target.name]: info.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);
    setLogin({
      ...login,
      isSub: true,
    });
    console.log(isError);
    if (isError.err) {
      console.log("Error logging in");

      setSuccess(true);
      setLoading(false);
    } else if (!isError.err) {
      console.log("should run")
      axios
        .post(
          "http://localhost:5000/api/auth/login",
          {
            email: login.email,
            password: login.password,
          },
          {
            headers: { Accept: "application/json" },
          }
        )
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.info.token)
          localStorage.setItem("user", res.data.info.id)
          dispatch({ type: "LOGIN_USER", payload: res.data.info})
          setSuccess(true);
          setLoading(false);
          setLogin({
            email: "",
            password: "",
          });
          history.push("/dashboard");
          cancelCourse();
        })
        .catch((err) => {
          console.log(err);
          setIsError({
            ...isError,
            msg: {
              ...isError.msg,
              network: "Error connecting to server. Try again later",
              details: err,
            },
          });
          setSuccess(true);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    loginErrorCheck({ user: login, errMsg: setIsError });
  }, [login]);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const cancelCourse = () => {
    document.getElementById("login-user-form").reset();
  };

  return (
    <ThemeProvider theme={theme}>
      {isError.msg.network && (
        <Alert severity="error" className={classes.fieldError}>
          <strong>Error connecting to the server. Please try again.</strong>
          {/* <AlertTitle>Invalid email address.</AlertTitle> */}
        </Alert>
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            id="login-user-form"
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  error={login.isSub && isError.e ? true : false}
                  onChange={handleInput}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  error={login.isSub && isError.p ? true : false}
                  onChange={handleInput}
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                {login.isSub && isError.err && (
                  <h6 className={classes.errorMain}>
                    Please complete all fields marked with *
                  </h6>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              // className={classes.submit}
              style={{ margin: "35px 0" }}
              // className={classes.submit}
              className={buttonClassname}
              disabled={loading}
              // onClick={handleButtonClick}
            >
              Login
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot Username/Password?
                </Link>
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  New user? Create an account
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
}
