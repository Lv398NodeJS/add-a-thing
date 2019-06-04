import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import { Container } from 'react-bootstrap';
import MainView from '@MainView/MainView';
import Dashboard from '@Dashboard/Dashboard';
import Login from '@Dashboard/Header/Authentication/Login';
import Logout from '@Dashboard/Header/Authentication/Logout';
import Signup from '@Dashboard/Header/Authentication/Signup';
import db from './fire';
import configureStore from './store/configureStore';
import configureSocket from './socket';

const store = configureStore();
export const socket = configureSocket(store.dispatch);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      loading: true,
    };
  }

  componentWillMount() {
    this.removeAuthListener = db.auth().onAuthStateChanged((user) => {
      this.setState({
        isLoggedIn: !!user,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  render() {
    const { loading, isLoggedIn } = this.state;

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
            <Route exact path="/" component={() => <MainView isLoggedIn={isLoggedIn} />} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={Signup} />
            <Route path="/:id" component={() => <Dashboard isLoggedIn={isLoggedIn} />} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
