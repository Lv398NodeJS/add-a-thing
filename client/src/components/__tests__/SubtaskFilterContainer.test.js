import React from 'react';
import { shallow } from 'enzyme';
import SubtaskFilterContainer from '../Subtask/SubtaskFilter/SubtaskFilterContainer';

describe('SubtaskFilterContainer component', () => {
  it('should render correctly and match the snapshot', () => {
    const subtaskFilterContainerComponent = shallow(
      <SubtaskFilterContainer />,
    );
    expect(subtaskFilterContainerComponent).toMatchSnapshot();
  });

  it('should render span with text "Show: "', () => {
    const subtaskFilterContainerComponent = shallow(
      <SubtaskFilterContainer />,
    );
    expect(subtaskFilterContainerComponent.find('span').text()).toBe('Show: ');
  });

  it('should render Bootstrap 4 ButtonGroup', () => {
    const subtaskFilterContainerComponent = shallow(
      <SubtaskFilterContainer />,
    );
    expect(subtaskFilterContainerComponent.find('ButtonGroup').length).toBe(1);
  });
});
