const sendAudioToWatson = async (blob) => {
  const headers = {
    Authorization: `Basic ${btoa('apikey:_3ZdYo0vTNIXxSZus4DUT7KEpWC7ntgt8atW5Y8fqECI')}`,
    'content-type': blob.type,
  };

  try {
    const response = await fetch(
      'https://gateway-lon.watsonplatform.net/speech-to-text/api/v1/recognize',
      {
        method: 'POST',
        headers,
        body: blob,
      },
    )
      .then(res => res.json());
    if (!response.results || !Array.isArray(response.results)) {
      return false;
    }

    let { results } = response;
    results = results
      .filter(result => result.final)
      .map((result) => {
        let { alternatives } = result;
        alternatives = alternatives.sort((a, b) => a.confidence - b.confidence);
        return alternatives.pop();
      })
      .filter();
    return results.shift();
  } catch (e) {
    return false;
  }
};

export default sendAudioToWatson;
