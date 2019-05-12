import React from 'react';
import { render, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

describe('Login', () => {
  it('Login should render correctly', () => {
    const component = shallow(<Login />);
    expect(component).toMatchSnapshot();
  });

  it('Should render 2 buttons group', () => {
    const component = render(<BrowserRouter><Login /></BrowserRouter>);
    expect(component.find('button').length).toBe(2);
  });

  it('Should render 2 inputs', () => {
    const component = render(<BrowserRouter><Login /></BrowserRouter>);
    expect(component.find('button').length).toBe(2);
  });
});
