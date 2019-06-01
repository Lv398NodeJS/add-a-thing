import React from 'react';
import { shallow } from 'enzyme';
import * as utils from '../Dashboard/TaskItem/TaskItemUtils';
import { TaskItemComponent } from '../Dashboard/TaskItem/TaskItem';

jest.mock('../Dashboard/TaskItem/TaskItemUtils');

const taskItem = shallow(<TaskItemComponent
  taskListRef=""
/>);

describe('<TaskItem />', () => {
  beforeEach(() => {
    const taskRef = jest.spyOn(utils, 'getTaskRef');
    taskRef.mockImplementation(() => 20);
  });
  it('mock functions should return values', () => {
    expect(utils.getTaskRef()).toEqual(20);
  });
  it('should render and match snapshot', () => {
    expect(taskItem).toMatchSnapshot();
  });

  it('should render one task name container', () => {
    const taskNameContainer = taskItem.find('[data-test="taskName"]');
    expect(taskNameContainer.length).toEqual(1);
  });

  it('should render name from props', () => {
    const taskName = 'Task 1';
    const taskItemWithProps = shallow(<TaskItemComponent taskName={taskName} />);
    const taskContainer = taskItemWithProps.find('[data-test="taskName"]');
    expect(taskContainer.text()).toEqual(taskName);
  });
  it('should open modal widnow on task click', () => {
    const taskNameContainer = taskItem.find('[data-test="taskContainer"]');
    taskNameContainer.simulate('click');
    expect(taskItem.state().modalShow).toBeTruthy();
  });

  it('should match snapshot when render name from props', () => {
    const taskName = 'Task 1';
    const taskItemWithProps = shallow(<TaskItemComponent taskName={taskName} />);
    expect(taskItemWithProps).toMatchSnapshot();
  });

  it('should change state on modal close', () => {
    const taskDetails = taskItem.find('[data-test="taskDetails"]');
    taskDetails.simulate('close');
    expect(taskItem.state().modalShow).toBeFalsy();
  });
});
