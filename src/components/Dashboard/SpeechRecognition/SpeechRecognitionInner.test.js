import React from 'react';
import { shallow, render } from 'enzyme';
import SpeechRecognitionInner from './SpeechRecognitionInner';

jest.mock(window.webkitSpeechRecognition);

describe('<SpeechRecognitionInner />', () => {
  it('should render and match snapshot', () => {
    window.webkitSpeechRecognition = function () {
      return {
        addEventListener: () => jest.fn(),
      };
    };
    const renderTest = render(<SpeechRecognitionInner />);
    expect(renderTest).toMatchSnapshot();
  });
  it('should render button', () => {
    const renderTest = shallow(<SpeechRecognitionInner />);
    expect(renderTest.find('Button').length).toBe(1);
  });
});
