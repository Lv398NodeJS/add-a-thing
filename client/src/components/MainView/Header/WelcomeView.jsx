import React, { Component } from 'react';
import welcomeView from '@assets/welcomeView.svg';

export default class WelcomeView extends Component {
  render() {
    return (
      <img src={welcomeView} alt="welcomeView" className="welcomeView" />
    );
  }
}
