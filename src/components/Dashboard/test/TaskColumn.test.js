import React from 'react';
import { shallow, render } from 'enzyme';
import * as utils from '../TasksColumn/utils';
import { TasksColumn } from '../TasksColumn/TasksColumn';

const taskColumn = shallow(<TasksColumn
  sortedTasks={[]}
  taskListRef=""
/>);

describe('<TaskColumn />', () => {
  it('should render and match snapshot', () => {
    const taskColumnR = render(<TasksColumn sortedTasks={[]} />);
    expect(taskColumnR).toMatchSnapshot();
  });
  it('should render title element', () => {
    const title = taskColumn.find('[data-test="columnTitle"]');
    expect(title.length).toEqual(1);
  });
  it('should render title text from props', () => {
    const titleText = 'To Do';
    const taskColumnT = shallow(<TasksColumn sortedTasks={[]} title={titleText} />);
    const title = taskColumnT.find('[data-test="columnTitle"]').text();
    expect(title).toEqual(titleText);
  });
  it('should have correct ToDo class name', () => {
    const titleText = 'To Do';
    const taskColumnT = shallow(<TasksColumn sortedTasks={[]} title={titleText} />);
    const title = taskColumnT.find('[data-test="columnTitle"]');
    const finalTitleStyle = utils.columnTitleClass(titleText);
    expect(title.hasClass(finalTitleStyle)).toBeTruthy();
  });
  it('should have correct InProgress class name', () => {
    const titleText = 'In Progress';
    const taskColumnT = shallow(<TasksColumn sortedTasks={[]} title={titleText} />);
    const title = taskColumnT.find('[data-test="columnTitle"]');
    const finalTitleStyle = utils.columnTitleClass(titleText);
    expect(title.hasClass(finalTitleStyle)).toBeTruthy();
  });
  it('should have correct Done class name', () => {
    const titleText = 'Done';
    const taskColumnT = shallow(<TasksColumn sortedTasks={[]} title={titleText} />);
    const title = taskColumnT.find('[data-test="columnTitle"]');
    const finalTitleStyle = utils.columnTitleClass(titleText);
    expect(title.hasClass(finalTitleStyle)).toBeTruthy();
  });
  it('should render container for tasks', () => {
    const tasksCont = taskColumn.find('[data-test="taskItemsContainer"]');
    expect(tasksCont.length).toBe(1);
  });
});
