import React from 'react';
import { shallow } from 'enzyme';
import { TaskDetails } from '../TaskDetails';


describe('TaskDetails', () => {
  const component = shallow(<TaskDetails name="name" />);

  it('should render TaskStatus child component', () => {
    expect(component.find('TaskStatus').length).toBe(1);
  });

  it('should render TaskPriority child component', () => {
    expect(component.find('TaskPriority').length).toBe(1);
  });

  it("open edit field for 'Name' when container clicked", () => {
    component.find('.open-edit-name').simulate('click');

    expect(component.state().editName).toEqual(true);
  });

  it("open edit field for 'Description' when container clicked", () => {
    component.find('.open-edit-description').simulate('click');

    expect(component.state().editDescription).toEqual(true);
  });
});
