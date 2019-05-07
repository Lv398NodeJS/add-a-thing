import React from 'react';
import { shallow } from 'enzyme';
import { ListOfDashBoards } from './ListOfDashboards';

describe('ListOfDashBoards', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(
      <ListOfDashBoards
        mainViewActions={{ fetchDashes: jest.fn() }}
        debug
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should render correctly with no data props', () => {
    const component = shallow(
      <ListOfDashBoards
        mainViewActions={{ fetchDashes: jest.fn() }}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
