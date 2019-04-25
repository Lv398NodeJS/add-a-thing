import React from 'react';
import { shallow } from 'enzyme';
import DashboardPreview from './DashboardPreview';

describe('DashboardPreview componentu', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<DashboardPreview debug />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    const component = shallow(<DashboardPreview />);

    expect(component).toMatchSnapshot();
  });
});

// describe('DashboardPreview with props', () => {
//   let props;

//   beforeEach(() => {
//     props = {
//       name: undefined,
//       description: undefined,
//       id: undefined,
//     };
//   });
// });
