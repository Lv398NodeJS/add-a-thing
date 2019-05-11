import React from 'react';
import { shallow, mount } from 'enzyme';
import MainInput from './MainInput';

describe('MainInput tests', () => {
  it('MainInput should render correctly', () => {
    const component = shallow(<MainInput />);
    expect(component).toMatchSnapshot();
  });

  it('Should render 2 or more buttons', () => {
    const component = mount(<MainInput />);
    expect(component.find('button').length).not.toBeLessThan(2);
  });

  it('Should render 1 input', () => {
    const component = mount(<MainInput />);
    expect(component.find('input').length).toBe(1);
  });

  it('Should change state after input text', () => {
    const fakeVal = 'some text';
    const component = mount(<MainInput />);
    const input = component.find('input');
    input.simulate('change', {target: {value: fakeVal} });
    expect(component.state().newTaskVal).toEqual(fakeVal);
  });

});
