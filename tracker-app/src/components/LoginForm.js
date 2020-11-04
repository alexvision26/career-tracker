import React, { useState } from 'react';
import { theme } from "../styles/theme";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
// import { sign } from 'jsonwebtoken';

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


export default function LoginForm() {
  const classes = useStyles(theme);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  })

  const handleInput = (info) => {
    setLogin({
      ...login,
      [info.target.name]: info.target.value
    });
  }

  const handleSubmit = (e) => {
    axios.post("http://localhost:5000/api/auth/login", login, { headers: { "Accept": "application/json" } }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    e.preventDefault()
    setLogin({
      email: "",
      password: "",
    })
    cancelCourse();
  }

  const cancelCourse = () => { 
    document.getElementById("login-user-form").reset();
  }

  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit} id="login-user-form" noValidate>
          <Grid container spacing={2}>
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
            Login
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
              <Link href="#" variant="body2">
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