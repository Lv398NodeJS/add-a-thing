import React, { Component } from 'react';
import {
  OverlayTrigger,
  Tooltip,
  Button,
} from 'react-bootstrap';
import microphoneIcon from '@assets/speakrec.svg';
import SpeechRecognitionHelper from './SpeechRecognitionHelper';

class SpeechRecognitionInner extends Component {
  recognition = null;

  constructor(props) {
    super(props);

    const lang = props.lang || 'en-US';
    this.recognition = new SpeechRecognitionHelper({
      continuous: false,
      interimResults: false,
      maxAlternatives: 1,
      lang,
    }, this.onResult);
    this.state = {
      status: 'ready',
    };
  }

  componentWillUnmount() {
    const { status } = this.state;
    if (status !== 'recording') {
      return;
    }

    this.recognition.stop();
  }

  toggleRecording = () => {
    const { status } = this.state;
    this[status === 'ready' ? 'startRecording' : 'stopRecording']();
  };

  startRecording = () => {
    this.recognition.start();
    this.setState({
      status: 'recording',
    });
  };

  stopRecording = () => {
    this.recognition.stop();
    this.setState({
      status: 'ready',
    });
  };

  onResult = (t) => {
    const { setText } = this.props;
    setText(t);
  };

  render() {
    const { status } = this.state;

    return (
      <OverlayTrigger
        placement="bottom"
        overlay={(
          <Tooltip>Click to start recording. Click again to stop.</Tooltip>
        )}
      >
        <Button
          variant={status === 'recording' ? 'danger' : 'outline-primary'}
          onClick={this.toggleRecording}
        >
          <img src={microphoneIcon} alt={microphoneIcon} className="inputicon" />
        </Button>
      </OverlayTrigger>
    );
  }
}

export default SpeechRecognitionInner;
