import React from 'react';
import { shallow } from 'enzyme';
import TaskDetailsModal from '../TaskDetailsModal';
// import DeleteTask from '../DeleteTask';

describe('TaskDetailsModal', () => {
  const component = shallow(<TaskDetailsModal />);
  it('should render Modal window correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render DeleteTask child component', () => {
    expect(component.find('DeleteTask').length).toBe(1);
  });

  it('should render TaskDetails child component', () => {
    expect(component.find('TaskDetails').length).toBe(1);
  });

  it('should render SubTaskList child component', () => {
    expect(component.find('SubTaskList').length).toBe(1);
  });
});
