import React, { useState } from "react";
import { theme } from "../styles/theme";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { sign } from "jsonwebtoken";

// import registerErrorCheck from "./errorHandle";

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

export default function SignUpForm(props) {
  const classes = useStyles(theme);
  const history = useHistory();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signup, setSignup] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    isSub: false,
  });
  const [isError, setIsError] = useState({
    f: false,
    l: false,
    e: false,
    p: false,
    err: false,
    msg: {},
  });

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  function registerErrorCheck(cred) {
    let f,
      l,
      e,
      p,
      err = false;
    let msg = {};

    if (signup.fname === "") {
      f = true;
    } else {
      f = false;
    }

    if (signup.lname === "") {
      l = true;
    } else {
      l = false;
    }

    if (signup.email === "") {
      e = true;
    } else {
      let c1 = signup.email.match(/@/g);
      let c2 = signup.email.match(/\./g);
      if (!c1 || !c2) {
        e = true;
      } else {
        e = false;
      }
    }

    if (signup.password.length < 7) {
      p = true;
    } else {
      p = false;
    }

    if (f || l || e || p) {
      err = true;
    } else {
      err = false;
    }

    setIsError({
      f: f,
      l: l,
      e: e,
      p: p,
      err: err,
      msg: {},
    });
  }

  useEffect(() => {
    registerErrorCheck({ user: signup, errMsg: setIsError() });
  }, [signup]);

  const handleInput = (info) => {
    setSignup({
      ...signup,
      [info.target.name]: info.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);
    setSignup({
      ...signup,
      isSub: true,
    });
    console.log(isError);
    if (isError.err) {
      console.log("Error registering");

      setSuccess(true);
      setLoading(false);
    } else if (!isError.err) {
      axios
        .post(
          "http://localhost:5000/api/auth/register",
          {
            fname: signup.fname,
            lname: signup.lname,
            email: signup.email,
            password: signup.password,
          },
          {
            headers: { Accept: "application/json" },
          }
        )
        .then((res) => {
          setSignup({
            fname: "",
            lname: "",
            email: "",
            password: "",
          });
          cancelCourse();
          history.push("/login");
          setSuccess(true);
          setLoading(false);
          props.handleClick();
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
          console.log(isError);
        });
    }
  };

  const cancelCourse = () => {
    document.getElementById("register-user-form").reset();
  };

  return (
    <ThemeProvider theme={theme}>
      {isError.msg.network && (
        <Alert severity="error" className={classes.fieldError}>
          <strong>Error connecting to server. Try again.</strong>
          {/* <AlertTitle>Invalid email address.</AlertTitle> */}
        </Alert>
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            id="register-user-form"
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="fname"
                  variant="outlined"
                  required
                  error={signup.isSub && isError.f ? true : false}
                  fullWidth
                  id="fname"
                  label="First Name"
                  onChange={handleInput}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  error={signup.isSub && isError.l ? true : false}
                  id="lname"
                  label="Last Name"
                  name="lname"
                  onChange={handleInput}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  error={signup.isSub && isError.e ? true : false}
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={handleInput}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  error={signup.isSub && isError.p ? true : false}
                  name="password"
                  label="Password"
                  type="password"
                  onChange={handleInput}
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {signup.isSub && isError.err && (
                <h6 className={classes.errorMain}>
                  Please complete all fields marked with *
                </h6>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              style={{ margin: "35px 0" }}
              // className={classes.submit}
              className={buttonClassname}
              disabled={loading}
              // onClick={handleButtonClick}
            >
              Sign Up
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {/* <Box mt={5}>
        <Copyright />
      </Box> */}
      </Container>
    </ThemeProvider>
  );
}
