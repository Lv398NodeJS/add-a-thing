import React, { Component } from 'react';
import SpeechRecognitionHelper from './SpeechRecognitionHelper';
import SpeechRecognitionInner from './SpeechRecognitionInner';

const apiSupported = SpeechRecognitionHelper.isSupported();

class SpeechRecognition extends Component {
  render() {
    const { props } = this;
    return apiSupported ? <SpeechRecognitionInner {...props} /> : null;
  }
}

export default SpeechRecognition;
