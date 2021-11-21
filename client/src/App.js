import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Components
import NotFound from "./components/routing/NotFound";
import Alert from "./components/Alert";
import Browse from "./components/Browse";

import { initialRequests } from "./actions/initial";

function App() {
  useEffect(() => {
    store.dispatch(initialRequests());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        {/* Alert is a part of every route in the app */}
        <Alert />
        <Switch>
          {/* Public Routes */}
          <Route exact path="/" component={Browse} />

          {/* Catch all routes */}
          <Route path="*" component={NotFound} status={404} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
