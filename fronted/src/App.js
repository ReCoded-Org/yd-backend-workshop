import { useState } from "react";
import WebsiteNav from "./components/Nav";
import Home from "./components/Home";
import Reports from "./components/Reports";
import News from './components/News'
import Awareness from './components/Awareness'
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [userData, setUserData] = useState({}); 
  return (
    <div className="App">
      <Router>
        <Route path="/" component={WebsiteNav} />
        <Route exact path="/">
          <Home {...userData} />
        </Route>
        <Route path="/reports">
          <Reports {...userData}/>
          </Route>
        <Route path="/news">
          <News {...userData} />
        </Route>
        <Route path="/awareness">
          <Awareness {...userData} />
        </Route>
        <Route path="/sign-in">
          <SignIn handleFetch={setUserData} />
        </Route>
        <Route path="/sign-up">
          <SignUp handleFetch={setUserData} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
