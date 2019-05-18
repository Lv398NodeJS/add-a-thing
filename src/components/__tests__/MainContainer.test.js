import React from 'react';
import { shallow } from 'enzyme';
import * as utils from '../Dashboard/MainContainer/MainContainerUtils';
import { MainContainerComponent } from '../Dashboard/MainContainer/MainContainer';

const mainContainer = shallow(<MainContainerComponent
  taskList={[]}
  mainContainerActions={{
    setTaskListRef: jest.fn(),
    fetchTaskList: jest.fn(),
  }}
/>);

describe('<MainContainer />', () => {
  it('should render and match snapshot', () => {
    expect(mainContainer).toMatchSnapshot();
  });
  it('should render row with columns', () => {
    const row = mainContainer.find('[data-test="columnsRow"]');
    expect(row.length).toBe(1);
  });
  it('should render 3 columns', () => {
    const columns = mainContainer.find('[data-test="columnsRow"]').children();
    expect(columns.length).toBe(3);
  });
});

describe('getTaskListAsArray()', () => {
  const obj = {
    '-Lcc0GCG-dvjcKH6BMEk': {
      description: 'Description for task',
      name: 'Create sub tasks',
      status: 'In Progress',
    },
  };

  it('should return an array', () => {
    expect(utils.getTaskListAsArray(obj)).toBeTruthy();
    expect(typeof utils.getTaskListAsArray(obj)).toEqual('object');
  });
});
