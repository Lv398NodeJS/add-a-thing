import React from 'react';
import { render } from 'enzyme';
import { ChatContainerComponent } from '../Dashboard/Chat/ChatContainer';

describe('<ChatContainerComponent />', () => {
  it('should render and match snapshot', () => {
    const testActions = {
      setChatVisibility: jest.fn(),
    };
    const testMessagesArray = [
      {
        _id: 'test_id',
        date: '1970-01-01T12:00:00.000Z',
        text: 'test message',
      },
    ];
    const renderTest = render(
      <ChatContainerComponent
        visible
        chatActions={testActions}
        messages={testMessagesArray}
      />,
    );
    expect(renderTest).toMatchSnapshot();
  });

  it('should render messages', () => {
    const testActions = {
      setChatVisibility: jest.fn(),
    };
    const testMessagesArray = [
      {
        _id: 'test_id',
        date: '1970-01-01T12:00:00.000Z',
        text: 'test message',
        userName: 'test_user',
      },
    ];
    const renderTest = render(
      <ChatContainerComponent
        visible
        chatActions={testActions}
        messages={testMessagesArray}
      />,
    );
    const messages = renderTest.find('div.alert');
    expect(messages.length).toBe(1);
  });
});
