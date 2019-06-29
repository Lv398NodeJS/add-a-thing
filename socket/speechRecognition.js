const speech = require('@google-cloud/speech');
const speechClient = new speech.SpeechClient();

const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US'; //en-US

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    profanityFilter: false,
    enableWordTimeOffsets: true,
  },
  interimResults: false // If you want interim results, set this to true
};

function configureSpeechRecognitionSocket(io){
  console.log('Client Connected to server');
  let recognizeStream;

  client.on('join', (data) => {
    client.emit('messages', 'Socket Connected to Server');
  });

  client.on('messages', (data) => {
    client.emit('broad', data);
  });

  client.on('startGoogleCloudStream', (data) => {
    startRecognitionStream(this, data);
  });

  client.on('binaryData', (data) => {
    // console.log(data); //log binary data
    if (recognizeStream) {
      recognizeStream.write(data);
    }
  });

  client.on('endGoogleCloudStream', (data) => {
    stopRecognitionStream();
  });


  function startRecognitionStream(client, data) {
    recognizeStream = speechClient.streamingRecognize(request)
      .on('error', console.error)
      .on('data', (data) => {
        process.stdout.write(
          (data.results[0] && data.results[0].alternatives[0])
            ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
            : `\n\nReached transcription time limit, press Ctrl+C\n`);
        client.emit('speechData', data);

        // if end of utterance, let's restart stream
        // this is a small hack. After 65 seconds of silence, the stream will still throw an error for speech length limit
        if (data.results[0] && data.results[0].isFinal) {
          stopRecognitionStream();
          startRecognitionStream(client);
          // console.log('restarted stream serverside');
        }
      });
  }
  function stopRecognitionStream() {
    if (recognizeStream) {
      recognizeStream.end();
    }
    recognizeStream = null;
  }
}

module.exports = configureSpeechRecognitionSocket;
