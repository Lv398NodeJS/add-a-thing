const recordAudio = () => new Promise(async (resolveObject) => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  const audioChunks = [];

  mediaRecorder.addEventListener('dataavailable', (event) => {
    audioChunks.push(event.data);
  });

  const start = () => mediaRecorder.start();

  const stop = () => new Promise((resolveRecordedAudio) => {
    mediaRecorder.addEventListener('stop', () => {
      const audioBlob = new Blob(audioChunks, {
        type: mediaRecorder.mimeType,
      });
      resolveRecordedAudio(audioBlob);
    });

    mediaRecorder.stop();
  });
  resolveObject({ start, stop });
});

export default recordAudio;
