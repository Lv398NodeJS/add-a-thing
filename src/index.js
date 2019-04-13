import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import MainView from './components/MainView/MainView';
import Dashboard from './components/Dashboard/Dashboard';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/:id" component={Dashboard} />
          <Route exact path="/" component={MainView} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
