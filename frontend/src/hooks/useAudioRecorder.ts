
import { useState, useRef, useCallback, useEffect } from 'react';

interface AudioRecorderState {
  isRecording: boolean;
  audioBlob: Blob | null;
  audioUrl: string | null;
  recordingTime: number;
  audioData: number[];
}

export const useAudioRecorder = () => {
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    audioBlob: null,
    audioUrl: null,
    recordingTime: 0,
    audioData: [],
  });
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Set up audio context and analyzer
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      
      analyserRef.current = analyser;
      const bufferLength = analyser.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
      
      // Create media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        setState(prev => ({
          ...prev,
          isRecording: false,
          audioBlob,
          audioUrl,
        }));
        
        // Clean up
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
      };
      
      // Start recording
      mediaRecorder.start();
      
      setState(prev => ({ 
        ...prev, 
        isRecording: true,
        audioBlob: null,
        audioUrl: null,
        audioData: [],
      }));
      
      // Set up timer
      let startTime = Date.now();
      timerRef.current = window.setInterval(() => {
        setState(prev => ({ 
          ...prev, 
          recordingTime: Math.floor((Date.now() - startTime) / 1000),
        }));
      }, 1000);
      
      // Start animation frame for visualizer
      const updateAudioData = () => {
        if (!analyserRef.current || !dataArrayRef.current) return;
        
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        const audioData = Array.from(dataArrayRef.current);
        
        setState(prev => ({ 
          ...prev, 
          audioData: audioData.slice(0, 32),
        }));
        
        animationFrameRef.current = requestAnimationFrame(updateAudioData);
      };
      
      updateAudioData();
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }, []);
  
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
      
      // Clean up
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  }, [state.isRecording]);
  
  const resetRecording = useCallback(() => {
    if (state.audioUrl) {
      URL.revokeObjectURL(state.audioUrl);
    }
    
    setState({
      isRecording: false,
      audioBlob: null,
      audioUrl: null,
      recordingTime: 0,
      audioData: [],
    });
  }, [state.audioUrl]);
  
  useEffect(() => {
    return () => {
      // Clean up on unmount
      if (state.audioUrl) {
        URL.revokeObjectURL(state.audioUrl);
      }
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [state.audioUrl]);
  
  return {
    ...state,
    startRecording,
    stopRecording,
    resetRecording,
  };
};
