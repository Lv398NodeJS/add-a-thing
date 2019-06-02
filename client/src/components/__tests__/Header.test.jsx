import React from 'react';
import { shallow } from 'enzyme';
import NavBar from '../Dashboard/Header/Header';

describe('NavBar', () => {
  it('when the user is logged in Header should have only Sign Out button', () => {
    const isLoggedIn = true
    const component = shallow(<NavBar isLoggedIn={isLoggedIn} />);
    expect(component).toMatchSnapshot();
  });

  it('when the user is not logged in Header should have Log in and Sign Up buttons', () => {
    const isLoggedIn = false
    const component = shallow(<NavBar isLoggedIn={isLoggedIn} />);
    expect(component).toMatchSnapshot();
  });
});
