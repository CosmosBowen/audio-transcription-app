export const sendAudioForTranscription = async (audioBlob: Blob): Promise<{ transcript: string }> => {
  try {
    console.log('Sending audio blob of size:', audioBlob.size);
    
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');
    
    const response = await fetch('http://localhost:8000/api/transcribe', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Transcription result:', result);
    return result;
  } catch (error) {
    console.error('Transcription error:', error);
    throw error;
  }
};