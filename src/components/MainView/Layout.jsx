import React, { Component } from 'react';
import Header from '../Dashboard/Header/Header';

export default class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: props.isLoggedIn,
    };
  }

  render() {
    const { isLoggedIn, children } = this.props;
    return (
      <>
        <Header isLoggedIn={isLoggedIn} />
        {children}
      </>
    );
  }
}
