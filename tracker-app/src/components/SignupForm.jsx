import React, { useState } from 'react';
import { theme } from "../styles/theme";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import { useHistory } from 'react-router-dom';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    width: '100%',
    height: "100%",
    flexDirection: 'column',
    justifyContent: "center",
    margin: "auto",
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  field: {
    outlineColor: '#7000ff',
    color: 'red',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'white',
    backgroundColor: '#7000ff',
    '&:hover': {
      backgroundColor: '#5d00d6'
    },
    '&:active': {
      backgroundColor: '#7000ff'
    }
  },
}));

export default function SignUpForm(props) {
  const classes = useStyles(theme);
  const history = useHistory();

  const [signup, setSignup] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  })

  const handleInput = (info) => {
    setSignup({
      ...signup,
      [info.target.name]: info.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:5000/api/auth/register", signup, { headers: { "Accept": "application/json" } }).then(res => {
      setSignup({
        fname: "",
        lname: "",
        email: "",
        password: "",
      })
      cancelCourse();
      history.push("/login")
      props.handleClick()
    }).catch(err => {
      console.log(err)
    })
  }

  const cancelCourse = () => { 
    document.getElementById("register-user-form").reset();
  }

  return (
    <ThemeProvider theme={theme}>

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit} id="register-user-form" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="fname"
                variant="outlined"
                required
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
                name="password"
                label="Password"
                type="password"
                onChange={handleInput}
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
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