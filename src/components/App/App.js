import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import About from "../../components/About/About";
import LandingPage from "../../routes/LandingPage";
import Adopt from "../../components/Adopt/Adopt";

function App() {
  return (
    <div>
      <header>
        <Link to={"/"}>
          <h1>Petful</h1>
        </Link>
      </header>

      <Switch>
        <Route exact path={"/"} components={LandingPage} />
        <Route exact path={"/about"} compoents={About} />
        <Route exact path={"/adopt"} component={Adopt} />
      </Switch>
    </div>
  );
}

export default App;
