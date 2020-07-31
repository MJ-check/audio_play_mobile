import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";

const App = () => {
  return (
    <div>
      <HashRouter>
        <Route exact path="/" render={() => (<Home />)} />
        <Route path="/home" render={() => (<Home />)} />
        <Route path="/list" render={() => (<List />)} />
      </HashRouter>
    </div>
  );
}

export default App;