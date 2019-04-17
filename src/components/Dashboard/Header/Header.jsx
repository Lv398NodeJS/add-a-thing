import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import avatar from '../../assets/avatar.svg';
import './Header.scss';


export default class NavBar extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="http://localhost:3000/">Add a thing</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="#login">
              Log in
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <img src={avatar} alt={avatar} className="avatar" />
      </Navbar>
    );
  }
}