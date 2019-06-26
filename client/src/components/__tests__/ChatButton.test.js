import React from 'react';
import { render, shallow } from 'enzyme';
import { ChatButtonComponent } from '../Dashboard/Chat/ChatButton';

describe('<ChatButtonComponent />', () => {
  it('should render and match snapshot', () => {
    const testActions = {
      setChatVisibility: jest.fn(),
    };
    const renderTest = render(
      <ChatButtonComponent
        {...testActions}
      />,
    );
    expect(renderTest).toMatchSnapshot();
  });

  it('should show chat on click', () => {
    const testActions = {
      setChatVisibility: jest.fn(),
    };
    const renderTest = shallow(
      <ChatButtonComponent
        {...testActions}
      />,
    );
    renderTest.find('Button').simulate('click');
    expect(testActions.setChatVisibility).toHaveBeenCalledTimes(1);
    expect(testActions.setChatVisibility).toHaveBeenCalledWith(true);
  });
});
