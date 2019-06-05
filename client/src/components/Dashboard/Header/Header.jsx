import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import avatar from '@assets/avatar.svg';
import './Header.scss';
import * as loginActions from '@actions/loginationActions';

export class Header extends React.Component {
  logOutUser = () => {
    const { loginationActions: { logOut } } = this.props;
    logOut();
  };

  render() {
    const { loggedData } = this.props;
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand><Link to="/">Add a thing</Link></Navbar.Brand>
        <Navbar id="responsive-navbar-nav" className="justify-content-end">
          {loggedData.isLoggedIn
            ? (
              <Nav>
                <Link
                  to="/logout"
                  onClick={this.logOutUser}
                >
                  {'Log out'}
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
        </Navbar>
        <img src={avatar} alt={avatar} className="avatar" />
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  loggedData: state.loginationReducer.loggedData,
});

const mapDispatchToProps = dispatch => ({
  loginationActions: bindActionCreators(loginActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
