import React from 'react';
import { shallow } from 'enzyme';
import DashboardPreview from './DashboardPreview';

describe('DashboardPreview component', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<DashboardPreview debug />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    const component = shallow(<DashboardPreview />);

    expect(component).toMatchSnapshot();
  });

  it('should render name and description properly', () => {
    const name = ['My awesome dashboard'];
    const description = ['How awesome am I?!'];

    const component = shallow(
      <DashboardPreview
        name={name}
        description={description}
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
