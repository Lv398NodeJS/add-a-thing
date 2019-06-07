import React from 'react';
import { shallow, mount } from 'enzyme';
import { MainInputComponent } from '../Dashboard/MainInput/MainInput';
import * as utils from '../Dashboard/MainInput/mainInputUtils';

describe('MainInputUtils tests', () => {
  it('Should trim spaces & cut "#3" ', () => { 
    const res = utils.addTaskWithHash('   text #3');
    expect(res).toEqual('text');
   });
   it('Should return "priorityL" priority color', () => { 
    const res = utils.showPriorityColor('Low');
    expect(res).toEqual('priorityL');
   });
   it('Should return "priorityM" priority color', () => { 
    const res = utils.showPriorityColor('Medium');
    expect(res).toEqual('priorityM');
   });
   it('Should return "priorityH" priority color', () => { 
    const res = utils.showPriorityColor('High');
    expect(res).toEqual('priorityH');
   });
   it('Should return "High" priority', () => { 
    const res = utils.getPriority('1');
    expect(res).toEqual('High');
   });
   it('Should return "Medium" priority', () => { 
    const res = utils.getPriority('');
    expect(res).toEqual('Medium');
   });
   it('Should return "Low" priority', () => { 
    const res = utils.getPriority('3');
    expect(res).toEqual('Low');
   });
});


describe('MainInput tests', () => {
  it('MainInput should render correctly', () => {
    const component = shallow(<MainInputComponent />);
    expect(component).toMatchSnapshot();
  });

  it('Should render 2 or more buttons', () => {
    const component = mount(<MainInputComponent />);
    expect(component.find('button').length).not.toBeLessThan(2);
  });

  it('Should render 1 input', () => {
    const component = mount(<MainInputComponent />);
    expect(component.find('input').length).toBe(1);
  });

  it('Should change state after input text', () => {
    const fakeVal = 'some text';
    const component = mount(<MainInputComponent />);
    const input = component.find('input');
    input.simulate('change', { target: { value: fakeVal } });
    expect(component.state().newTaskVal).toEqual(fakeVal);
  });

  it('Should change state after clear button press', () => {
    const fakeVal = 'some text';
    const component = mount(<MainInputComponent />);
    const input = component.find('input');
    input.simulate('change', { target: { value: fakeVal } });
    const button = component.find('.btn-outline-danger');
    button.simulate('click');
    expect(component.state().newTaskVal).toEqual('');
  });

  it('Should change priority in state', () => {
    const newVal = 'Low';
    const component = mount(<MainInputComponent />);
    const select = component.find('select');
    select.simulate('change', { target: { value: newVal } });
    expect(component.state().priority).toEqual(newVal);
  });
});
