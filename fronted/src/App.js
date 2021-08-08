import { useState } from "react";
import Nav from "./components/Nav";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import News from './components/News'
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [userData, setUserData] = useState({}); 
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Nav} />
        <Route exact path="/">
          <Home {...userData} />
        </Route>
        <Route path="/sign-in">
          <SignIn handleFetch={setUserData} />
        </Route>
        <Route path="/sign-up">
          <SignUp handleFetch={setUserData} />
        </Route>
        <Route path="/news">
          <News {...userData} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
