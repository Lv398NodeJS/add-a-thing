import React from 'react';
import { shallow, render } from 'enzyme';
import SortList from './SortList';

const TestChild = props => (
  <span>
    {JSON.stringify(props, null, 2)}
  </span>
);

const sortList = shallow(
  <SortList
    storageKey="test"
    sortIconColor="#ffc000"
    fields={[
      {
        key: 'priorityForSorting',
        text: 'Priority',
      },
    ]}
  >
    <TestChild priorityForSorting="3">c</TestChild>
    <TestChild priorityForSorting="1">a</TestChild>
    <TestChild priorityForSorting="2">b</TestChild>
  </SortList>,
);

describe('<SortList />', () => {
  it('should render and match snapshot', () => {
    const renderTest = render(
      <SortList
        storageKey="test"
        sortIconColor="#ffc000"
        fields={[
          {
            key: 'priorityForSorting',
            text: 'Priority',
          },
        ]}
      >
        <TestChild priorityForSorting="3">c</TestChild>
        <TestChild priorityForSorting="1">a</TestChild>
        <TestChild priorityForSorting="2">b</TestChild>
      </SortList>,
    );
    expect(renderTest).toMatchSnapshot();
  });

  it('should render dropdown', () => {
    const dropdown = sortList.find('Dropdown');
    expect(dropdown.length).toBe(1);
  });

  it('should render children', () => {
    const dropdown = sortList.find('TestChild');
    expect(dropdown.length).toBe(3);
  });
});
