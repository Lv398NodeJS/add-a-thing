import React from 'react';
import { shallow } from 'enzyme';
import SubTaskFilterContainer from '../SubTask/SubTaskFilter/SubTaskFilterContainer';

describe('SubTaskFilterContainer component', () => {
  it('should render correctly and match the snapshot', () => {
    const subTaskFilterContainerComponent = shallow(
      <SubTaskFilterContainer />,
    );
    expect(subTaskFilterContainerComponent).toMatchSnapshot();
  });

  it('should render span with text "Show: "', () => {
    const subTaskFilterContainerComponent = shallow(
      <SubTaskFilterContainer />,
    );
    expect(subTaskFilterContainerComponent.find('span').text()).toBe('Show: ');
  });

  it('should render Bootstrap 4 ButtonGroup', () => {
    const subTaskFilterContainerComponent = shallow(
      <SubTaskFilterContainer />,
    );
    expect(subTaskFilterContainerComponent.find('ButtonGroup').length).toBe(1);
  });
});
