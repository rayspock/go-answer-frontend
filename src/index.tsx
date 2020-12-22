import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from './store';
import history from "./utils/history";
import RootComponent from './RootComponent';
import Notification from './components/Message/Notification';
import Home from './components/Home';
import History from './components/History';
import Answer from './components/Answer';

ReactDOM.render(
  <Provider store={store}>
    <RootComponent>
      <Notification />
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/answer" component={Answer} />
          <Route path="/history" exact component={History} />
        </Switch>
      </Router>
    </RootComponent>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
