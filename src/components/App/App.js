import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import About from "../../components/About/About";
import LandingPage from "../../routes/LandingPage";
import Adopt from "../../routes/Adopt";

function App() {
  return (
    <div>
      <header>
        <Link to={"/"}>
          <h1 className='petful'>Petful</h1>
        </Link>
      </header>

      <Switch>
        <Route exact path={"/"} component={LandingPage} />
        <Route exact path={"/about"} component={About} />
        <Route exact path={"/adopt"} component={Adopt} />
      </Switch>
    </div>
  );
}

export default App;
