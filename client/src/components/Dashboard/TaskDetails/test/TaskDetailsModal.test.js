import React from 'react';
import { shallow } from 'enzyme';
import TaskDetailsModal from '../TaskDetailsModal';

describe('TaskDetailsModal', () => {
  const component = shallow(<TaskDetailsModal />);
  it('should render Modal window correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it("open modal window when 'Delete' button clicked", () => {
    component.find('.delete-task-details-button').simulate('click');

    expect(component.state().showDelete).toEqual(true);
  });
});
