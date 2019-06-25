import React, { Component } from 'react';
import '../../App.scss';
import Header from './Header/Header';
import '@src/App.scss';
import NavBar from './Header/Header';
import MainContainer from './MainContainer/MainContainer';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <MainContainer />
      </div>
    );
  }
}
