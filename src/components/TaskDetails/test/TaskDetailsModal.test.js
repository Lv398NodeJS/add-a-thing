import React from 'react';
import { shallow } from 'enzyme';
import TaskDetailsModal from '../TaskDetailsModal';

describe('TaskDetailsModal', () => {
  it('should render correctly', () => {
    const component = shallow(<TaskDetailsModal />);

    expect(component).toMatchSnapshot();
  });
});
