const sendAudioToWatson = async (blob) => {
  const headers = {
    Authorization: `Basic ${btoa('apikey:_3ZdYo0vTNIXxSZus4DUT7KEpWC7ntgt8atW5Y8fqECI')}`,
    'content-type': blob.type,
  };

  let result;
  try {
    result = await fetch(
      'https://gateway-lon.watsonplatform.net/speech-to-text/api/v1/recognize',
      {
        method: 'POST',
        headers,
        body: blob,
      },
    )
      .then(res => res.json());
  } catch (e) {
    return false;
  }
  result = result.results.filter(res => res.final);
  if (!result.length) {
    return false;
  }

  return result[0].alternatives[0].transcript;
};

export default sendAudioToWatson;
