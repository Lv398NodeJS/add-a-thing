import React, { Component } from 'react';
import '../../App.scss';
import Header from '@MainView/Header/Header';
import '@src/App.scss';
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
