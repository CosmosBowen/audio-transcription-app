
import React, { useState } from 'react';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
// Change this import
import { sendAudioForTranscription } from '@/lib/api';
// import { sendAudioForTranscription } from '@/lib/mockApi';
import RecordButton from './RecordButton';
import AudioVisualizer from './AudioVisualizer';
import TranscriptionDisplay from './TranscriptionDisplay';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const AudioRecorder: React.FC = () => {
  const { 
    isRecording, 
    audioBlob, 
    audioData, 
    recordingTime,
    startRecording, 
    stopRecording, 
    resetRecording 
  } = useAudioRecorder();
  
  const [transcript, setTranscript] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleRecordToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      setTranscript(null);
      startRecording();
    }
  };
  
  const handleSendAudio = async () => {
    if (!audioBlob) {
      toast.error('No audio recording available to send');
      return;
    }
    
    setIsProcessing(true);
    console.log('Sending audio for transcription, size:', audioBlob.size);
    
    try {
      const result = await sendAudioForTranscription(audioBlob);
      console.log('Received transcription:', result);
      setTranscript(result.transcript);
      toast.success('Audio transcribed successfully');
    } catch (error) {
      console.error('Error transcribing audio:', error);
      toast.error('Failed to transcribe audio');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleReset = () => {
    resetRecording();
    setTranscript(null);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      <div className="glass-panel flex flex-col items-center p-6 gap-4">
        <AudioVisualizer 
          audioData={audioData} 
          isRecording={isRecording}
        />
        
        <div className="flex flex-col items-center gap-4">
          <RecordButton 
            isRecording={isRecording}
            isProcessing={isProcessing}
            recordingTime={recordingTime}
            onClick={handleRecordToggle}
            disabled={isProcessing}
          />
          
          {audioBlob && !isRecording && (
            <div className="flex gap-3 animate-fade-in">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={isProcessing}
              >
                Reset
              </Button>
              
              <Button
                size="sm"
                onClick={handleSendAudio}
                disabled={isProcessing || !audioBlob}
              >
                Transcribe
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <TranscriptionDisplay 
        transcript={transcript}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default AudioRecorder;
