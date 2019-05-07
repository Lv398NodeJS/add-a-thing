import React, { Component } from 'react';
import {
  OverlayTrigger,
  Tooltip,
  Button,
} from 'react-bootstrap';
import Artyom from 'artyom.js';
import microphoneIcon from '../../assets/speakrec.svg';


class SpeechRecognition extends Component {
  artyom = null;

  speechRecognition = null;

  constructor(props) {
    super(props);
    this.state = {
      status: 'waiting',
    };

    this.artyom = new Artyom();
  }

  componentWillUnmount() {
    const { status } = this.state;
    if (status !== 'recording') {
      return;
    }
    this.speechRecognition.stop();
    this.artyom.fatality();
  }

  startRecording = async () => {
    const { status } = this.state;
    if (status !== 'waiting') {
      return;
    }

    this.artyom.initialize({
      lang: 'ru-RU',
      debug: true,
      listen: true,
    });
    this.speechRecognition = this.artyom.newDictation({
      continuous: window.location.protocol === 'https:',
      onResult: this.onResult,
    });
    this.speechRecognition.start();

    this.setState({
      status: 'recording',
    });
  };

  stopRecording = async () => {
    const { status } = this.state;
    if (status !== 'recording') {
      return;
    }
    this.setState({
      status: 'loading',
    });
    this.speechRecognition.stop();
  };

  onResult = async (t) => {
    const { status } = this.state;
    const { setText } = this.props;
    if (status !== 'loading') {
      return;
    }
    this.setState({
      status: 'waiting',
    });
    setText(t);
  };

  render() {
    const { status } = this.state;
    return (
      <OverlayTrigger
        placement="bottom"
        overlay={(
          <Tooltip>Hold to record audio.</Tooltip>
        )}
      >
        <Button
          variant={status === 'recording' ? 'danger' : 'outline-primary'}
          onTouchStart={this.startRecording}
          onTouchEnd={this.stopRecording}
          onMouseDown={this.startRecording}
          onMouseUp={this.stopRecording}
        >
          <img src={microphoneIcon} alt={microphoneIcon} className="inputicon" />
        </Button>
      </OverlayTrigger>
    );
  }
}

export default SpeechRecognition;
