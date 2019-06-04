import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import { Container } from 'react-bootstrap';
import MainView from './components/MainView/MainView';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Dashboard/Header/Authentication/Login';
import Logout from './components/Dashboard/Header/Authentication/Logout';
import Signup from './components/Dashboard/Header/Authentication/Signup';
import configureStore from './store/configureStore';

const store = configureStore();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    const { loading } = this.state;
    if (loading === true) {
      return (
        <Container className="App">
          <h3> Loading </h3>
          <Spinner />
        </Container>
      );
    }

    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainView} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={Signup} />
            <Route path="/:id" component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
