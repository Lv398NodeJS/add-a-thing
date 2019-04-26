import React from 'react';
import { shallow } from 'enzyme';
import ListOfDashBoards from './ListOfDashboards';

describe('ListOfDashBoards', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<ListOfDashBoards debug />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    const component = shallow(<ListOfDashBoards />);

    expect(component).toMatchSnapshot();
  });
});
