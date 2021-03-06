class SpeechRecognitionHelper {
  recognition = null;

  constructor(recognitionOptions, onResultCallback = () => {}) {
    const recognition = new window.webkitSpeechRecognition();
    Object.assign(recognition, recognitionOptions);
    recognition.addEventListener('result', (event) => {
      const text = event.results[0][0].transcript;
      console.log(text);
      onResultCallback(text);
    });
    this.recognition = recognition;
  }

  start() {
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }

  static isSupported() {
    return 'webkitSpeechRecognition' in window;
  }
}

export default SpeechRecognitionHelper;
