import React, {Component} from 'react';
import { Link } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../Header';
import LogIn from './Login';

class Authentication extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
    }
  }
}

render() {
  return (
    <BrowserRouter>
      <Header authenticated={this.state.authenticated} />
      <Router exact path="/login" component="Login"></Router>
    </BrowserRouter>
  )
}

export default Authentication;