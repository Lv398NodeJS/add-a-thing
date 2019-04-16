import React, { Component } from 'react';
import { OverlayTrigger, Tooltip, Button, Spinner } from "react-bootstrap";

const recordAudio = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];
    
    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });
    
    const start = () => mediaRecorder.start();
    
    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks, {
            type: mediaRecorder.mimeType
          });
          resolve(audioBlob);
        });
        
        mediaRecorder.stop();
      });
    
    resolve({ start, stop });
  });


class SpeechRecognition extends Component {
  constructor(){
    super();
    this.state = {
      recorder: "",
      status: "waiting"
    };
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }
  
  async startRecording(){
    const { status } = this.state;
    if(status !== "waiting"){
      return;
    }
    let recorder = await recordAudio();
    recorder.start();
    
    this.setState({
      status: "recording",
      recorder
    });
  }
  
  async stopRecording(){
    const { recorder, status } = this.state;
    if(status !== "recording"){
      return;
    }
    this.setState({
      status: "loading"
    });
    
    const audioBlob = await recorder.stop();
    let newText = await this.sendToWatson(audioBlob);
    if(newText.length > 0){
      this.props.onResultReady(newText);
    }
    this.setState({
      status: "waiting"
    });
  }
  
  async sendToWatson(blob){
    const headers = {
      Authorization: "Basic " + btoa("apikey:_3ZdYo0vTNIXxSZus4DUT7KEpWC7ntgt8atW5Y8fqECI"),
      "content-type": blob.type
    };
    
    let result;
    try{
      result = await fetch(
        "https://gateway-lon.watsonplatform.net/speech-to-text/api/v1/recognize",
        {
          method: "POST",
          headers: headers,
          body: blob
        }
      )
        .then(res => res.json());
    }catch(e){
      return false;
    }
    result = result.results.filter((res) => res.final);
    if(!result.length){
      return false;
    }
    
    return result.shift().alternatives.shift().transcript;
  }
  
  onFieldChange(e){
    let newText = e.target.value;
    this.setState({
      text: newText
    });
  }
  
  render() {
    return (
      <OverlayTrigger
        placement={"bottom"}
        overlay={
          <Tooltip>
            Hold to record audio.
          </Tooltip>
        }
      >
        <Button
          variant={this.state.status === "recording" ? "danger" : "outline-primary"}
          disabled={this.state.status === "loading"}
          onTouchStart={this.startRecording}
          onTouchEnd={this.stopRecording}
          onMouseDown={this.startRecording}
          onMouseUp={this.stopRecording}
        >
          {
            this.state.status === "loading" ?
              (<Spinner animation="grow" size="sm" variant="primary"/>) :
              ("🎙")
          }
        </Button>
      </OverlayTrigger>
    );
  }
}

export default SpeechRecognition;
