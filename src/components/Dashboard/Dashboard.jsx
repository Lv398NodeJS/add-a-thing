import React, { Component } from 'react';
import '../../App.scss';
import NavBar from './Header/Header';
import MainContainer from './MainContainer/MainContainer';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <MainContainer />
      </div>
    );
  }
}
