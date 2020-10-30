import './App.scss';
import SignUpForm from "./components/SignupForm";

function App() {
  return (
    <div className="App">
      <div className="background-signup">
        <div className="purple-accent"/>
        <div className="signup-page">
          
        <div className="form">
        <h1 className="form-title">Tracker.io</h1>
        <h3>Signup free today!</h3>
            <SignUpForm/>
          </div>
          <div className="signup-img">
            <div className="signup-img-overlay"/>
            <div className="signup-prof-img"></div>
          </div>
          
        </div>
        </div>
    </div>
  );
}

export default App;
