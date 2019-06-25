import React from 'react';
import { shallow, render } from 'enzyme';
import { SortListComponent } from '../Dashboard/SortList/SortList';

describe('<SortList />', () => {
  it('should render and match snapshot', () => {
    const testActions = {
      setSort: jest.fn(),
    };
    const testAllSortSettings = {
      test: {
        direction: 'NONE',
      },
    };
    const renderTest = render(
      <SortListComponent
        storageKey="test"
        sortIconColor="#ffc000"
        sortListActions={testActions}
        allSortSettings={testAllSortSettings}
      />,
    );
    expect(renderTest).toMatchSnapshot();
  });

  it('should render dropdown', () => {
    const testActions = {
      setSort: jest.fn(),
    };
    const testAllSortSettings = {
      test: {
        direction: 'NONE',
      },
    };
    const renderTest = shallow(
      <SortListComponent
        storageKey="test"
        sortIconColor="#ffc000"
        sortListActions={testActions}
        allSortSettings={testAllSortSettings}
      />,
    );
    const dropdown = renderTest.find('Dropdown');
    expect(dropdown.length).toBe(1);
  });
});
