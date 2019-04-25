import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';
import CreateDashboard from './CreateDashboard';

describe('CreateDashboard', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<CreateDashboard debug />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    const component = shallow(<CreateDashboard />);

    expect(component).toMatchSnapshot();
  });

  let mountedCreateBtn;

  const createDashboard = () => {
    if (!mountedCreateBtn) {
      mountedCreateBtn = mount(
        <CreateDashboard />,
      );
    }
    return mountedCreateBtn;
  };

  it('always renders the button', () => {
    const button = createDashboard().find('.createNewDash');
    expect(button.length).toBeGreaterThan(0);
  });

  it('closes the Modal when ESC key is pressed', () => {
    const closeFn = jest.fn();
    const root = document.createElement('div');
    ReactDOM.render(
      <CreateDashboard closeFn={closeFn}>
          Hello World
      </CreateDashboard>,
      root,
    );
    const evt = new KeyboardEvent('keydown', { keyCode: 27 });
    // 27 == Escape Key
    document.dispatchEvent(evt);
    expect(closeFn).toHaveBeenCalledTimes(1);
});
});
