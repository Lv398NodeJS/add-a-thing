import React, { Component } from 'react';
import {
  OverlayTrigger,
  Tooltip,
  Button,
  Spinner,
} from 'react-bootstrap';
import recordAudio from './recordAudio';
import sendAudioToWatson from './sendAudioToWatson';


class SpeechRecognition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recorder: '',
      status: 'waiting',
    };
  }

  startRecording = async () => {
    const { status } = this.state;
    if (status !== 'waiting') {
      return;
    }
    const recorder = await recordAudio();
    recorder.start();

    this.setState({
      status: 'recording',
      recorder,
    });
  };

  stopRecording = async () => {
    const { recorder, status } = this.state;
    const { setText } = this.props;
    if (status !== 'recording') {
      return;
    }
    this.setState({
      status: 'loading',
    });

    const audioBlob = await recorder.stop();
    const newText = await sendAudioToWatson(audioBlob);
    if (newText.length > 0) {
      setText(newText);
    }
    this.setState({
      status: 'waiting',
    });
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
          disabled={status === 'loading'}
          onTouchStart={this.startRecording}
          onTouchEnd={this.stopRecording}
          onMouseDown={this.startRecording}
          onMouseUp={this.stopRecording}
        >
          {
            status === 'loading'
              ? (<Spinner animation="grow" size="sm" variant="primary" />)
              : ('🎙')
          }
        </Button>
      </OverlayTrigger>
    );
  }
}

export default SpeechRecognition;
