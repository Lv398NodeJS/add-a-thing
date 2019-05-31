import React from 'react';
import { shallow } from 'enzyme';
import DashboardPreview from '../MainView/ListOfDashboards/DashboardPreview/DashboardPreview';

describe('DashboardPreview component', () => {
  const component = shallow(<DashboardPreview />);

  it('should render correctly in "debug" mode', () => {
    const componentDebug = shallow(<DashboardPreview debug />);

    expect(componentDebug).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render name properly', () => {
    const name = 'I am an awesome dashboard';

    const componentWithProps = shallow(
      <DashboardPreview
        name={name}
      />,
    );
    const dashName = componentWithProps.find('.dash-name');

    expect(dashName.text()).toBe('I am an awesome dashboard');
  });

  it('should render description properly', () => {
    const description = 'How awesome am I?';

    const componentWithProps = shallow(
      <DashboardPreview
        description={description}
      />,
    );
    const dashDescription = componentWithProps.find('.dash-description');

    expect(dashDescription.text()).toBe('How awesome am I?');
  });

  it("opens modal window when 'Delete' button clicked", () => {
    component.find('.delete-btn').simulate('click');

    expect(component.state().showComponent).toEqual(true);
  });
});
