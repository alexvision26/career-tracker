import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUpForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

function App() {

  return (
    <Router>

    <div className="App">

      <Switch>
        <Route path="/register">
      <div className="background-signup">
        <div className="purple-accent"/>
        <div className="signup-page">
          
        <div className="form">
        <h1 className="form-title">Tracker.io</h1>
        <h3>Signup free today!</h3>
            <SignUpForm />
          </div>
          <div className="signup-img">
            <div className="signup-img-overlay"/>
            <div className="signup-prof-img"></div>
          </div>
          
        </div>
        </div>
        </Route>

        <Route path="/login">
          <div className="login-form">
          <h1 className="form-title">Tracker.io</h1>
            <div className="login-content">
            
            <h3>Login</h3>
            <LoginForm />
            </div>
          </div>
        </Route>

        </Switch>

    </div>

    </Router>
  );
}

export default App;
