import React, { Component } from 'react';
import '../../App.scss';
import NavBar from './Header/Header';
import ChatContainer from './Chat/ChatContainer';
import MainContainer from './MainContainer/MainContainer';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: props.isLoggedIn,
    };
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <div>
        <NavBar isLoggedIn={isLoggedIn} />
        <MainContainer />
        <ChatContainer />
      </div>
    );
  }
}
