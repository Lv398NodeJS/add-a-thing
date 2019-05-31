import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.svg';
import './Header.scss';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: props.isLoggedIn,
    };
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand><Link to="/">Add a thing</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          {isLoggedIn
            ? (
              <Nav>
                <Link to="/logout">
                  {'Sign out'}
                </Link>
              </Nav>
            )
            : (
              <Nav>
                <Link to="/login">
                  {'Log in'}
                </Link>
                <Link to="/signup">
                  {'Sign up'}
                </Link>
              </Nav>
            )
          }
        </Navbar.Collapse>
        <img src={avatar} alt={avatar} className="avatar" />
      </Navbar>
    );
  }
}
