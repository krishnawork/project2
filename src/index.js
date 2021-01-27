import React from "react";
// import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { render } from "react-snapshot";
import Pages from "./pages";
import * as serviceWorker from "./serviceWorker";
import Others_k_X_ad from "./pages/Dashboard2/Other/Test";

render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path={`/others_k_X_ad`} component={Others_k_X_ad} />
        <Route>
          <Pages />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
