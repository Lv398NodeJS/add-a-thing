import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainView from '@MainView/MainView';
import Dashboard from '@Dashboard/Dashboard';
import Login from '@MainView/Header/Authentication/Login';
import Logout from '@MainView/Header/Authentication/Logout';
import Signup from '@MainView/Header/Authentication/Signup';
import {bindActionCreators} from "redux";
import * as loginActions from '@actions/loginationActions';

export class App extends Component {
  componentDidMount(){
    const {loginationActions: { loggedUser }} = this.props;
    const loggedInData = {
      token: localStorage.getItem('token'),
    };
    if(localStorage.getItem('token')) {
      loggedUser(loggedInData);
    } else {
      localStorage.clear();
    }
  }

  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainView} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={Signup} />
            <Route path="/:id" component={Dashboard} />
          </Switch>
        </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginationActions: bindActionCreators(loginActions, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(App);
