import React from 'react';
import { render, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Signup from '../Dashboard/Header/Authentication/Login';

describe('Signup', () => {
  it('Login should render correctly', () => {
    const component = shallow(<Signup />);
    expect(component).toMatchSnapshot();
  });

  it('Should render 1 button', () => {
    const component = render(<BrowserRouter><Signup /></BrowserRouter>);
    expect(component.find('.App button').length).toBe(1);
  });

  it('Should render 4 inputs', () => {
    const component = render(<BrowserRouter><Signup /></BrowserRouter>);
    expect(component.find('input').length).toBe(4);
  });
});
