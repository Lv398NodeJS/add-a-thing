import io from 'socket.io-client';

const socket = io.connect();

//= ================ CONFIG =================
// Stream Audio
const bufferSize = 2048;

let AudioContext;
let context;
let processor;
let input;
let globalStream;

let streamStreaming = false;


window.onbeforeunload = () => {
  if (streamStreaming) { socket.emit('endGoogleCloudStream', ''); }
};


socket.on('connect', () => {
  socket.emit('join', 'Server Connected to Client');
});

socket.on('messages', (data) => {
  console.log(data);
});

socket.on('speechData', (data) => {
  const dataFinal = undefined || data.results[0].isFinal;

  if (dataFinal === true) {
    console.log(data);
  }
});

// audioStream constraints
const constraints = {
  audio: true,
  video: false,
};

function downsampleBuffer(buffer, sampleRate, outSampleRate) {
  if (outSampleRate === sampleRate) {
    return buffer;
  }
  if (outSampleRate > sampleRate) {
    throw new Error('downsampling rate show be smaller than original sample rate');
  }
  const sampleRateRatio = sampleRate / outSampleRate;
  const newLength = Math.round(buffer.length / sampleRateRatio);
  const result = new Int16Array(newLength);
  let offsetResult = 0;
  let offsetBuffer = 0;
  while (offsetResult < result.length) {
    const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
    let accum = 0; let
      count = 0;
    for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i += 1) {
      accum += buffer[i];
      count += 1;
    }

    result[offsetResult] = Math.min(1, accum / count) * 0x7FFF;
    offsetResult += 1;
    offsetBuffer = nextOffsetBuffer;
  }
  return result.buffer;
}

function microphoneProcess(e) {
  const left = e.inputBuffer.getChannelData(0);
  const left16 = downsampleBuffer(left, 44100, 16000);
  socket.emit('binaryData', left16);
}


class SpeechRecognitionHelper {
  recognition = null;

  constructor(recognitionOptions, onResultCallback = () => {}) {
    this.onResultClaaback = onResultCallback;
  }

  start = () => {
    socket.emit('startGoogleCloudStream', ''); // init socket Google Speech Connection
    streamStreaming = true;
    AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext({
      // if Non-interactive, use 'playback' or 'balanced'
      // https://developer.mozilla.org/en-US/docs/Web/API/AudioContextLatencyCategory
      latencyHint: 'interactive',
    });
    processor = context.createScriptProcessor(bufferSize, 1, 1);
    processor.connect(context.destination);
    context.resume();

    const handleSuccess = function (stream) {
      globalStream = stream;
      input = context.createMediaStreamSource(stream);
      input.connect(processor);

      processor.onaudioprocess = function (e) {
        microphoneProcess(e);
      };
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(handleSuccess);
  };

  stop = () => {
    streamStreaming = false;
    socket.emit('endGoogleCloudStream', '');

    const track = globalStream.getTracks()[0];
    track.stop();

    input.disconnect(processor);
    processor.disconnect(context.destination);
    context.close().then(() => {
      input = null;
      processor = null;
      context = null;
      AudioContext = null;
    });
  };

  static isSupported() {
    return 'webkitSpeechRecognition' in window;
  }
}

export default SpeechRecognitionHelper;
