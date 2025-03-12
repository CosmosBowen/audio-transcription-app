
// Mock API simulating sending audio to a backend for transcription
export const sendAudioForTranscription = async (audioBlob: Blob): Promise<{ transcript: string }> => {
  // Simulate API call with delay
  return new Promise((resolve) => {
    console.log('Sending audio blob of size:', audioBlob.size);
    
    // Simulate processing time (2-4 seconds)
    const delay = 2000 + Math.random() * 2000;
    
    setTimeout(() => {
      // Mock transcription responses
      const responses = [
        "Welcome to the audio transcription demo. This is a sample transcription of what you've recorded.",
        "Thank you for testing this application. Your audio has been processed successfully.",
        "This is a demonstration of the audio recording and transcription capabilities.",
        "The system is working as expected. Your voice has been captured and transcribed.",
        "This is a simulated transcription response as if it came from a real backend service.",
      ];
      
      // Choose a random response
      const transcript = responses[Math.floor(Math.random() * responses.length)];
      
      resolve({ transcript });
    }, delay);
  });
};
