import React, { Component } from 'react';
import {
  OverlayTrigger,
  Tooltip,
  Button,
} from 'react-bootstrap';
import microphoneIcon from '../../assets/speakrec.svg';
import SpeechRecognitionHelper from './SpeechRecognitionHelper';

class SpeechRecognition extends Component {
  recognition = null;

  constructor(props) {
    super(props);

    if (!SpeechRecognitionHelper.isSupported()) {
      this.state = {
        status: 'disabled',
      };
      return;
    }

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

  toggleRecording = async () => {
    const { status } = this.state;
    let newStatus = status;
    switch (status) {
      case 'ready':
        this.startRecording();
        newStatus = 'recording';
        break;
      case 'recording':
        this.stopRecording();
        newStatus = 'ready';
        break;
      default:
        break;
    }
    this.setState({
      status: newStatus,
    });
  };

  startRecording = async () => {
    this.recognition.start();
  };

  stopRecording = async () => {
    this.recognition.stop();
  };

  onResult = async (t) => {
    const { setText } = this.props;
    setText(t);
  };

  render() {
    const { status } = this.state;

    if (status === 'disabled') {
      return <></>;
    }

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

export default SpeechRecognition;
