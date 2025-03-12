
import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface AudioVisualizerProps {
  audioData: number[];
  isRecording: boolean;
  className?: string;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ 
  audioData,
  isRecording,
  className
}) => {
  const normalizedData = useMemo(() => {
    if (!audioData.length) {
      // Create placeholder bars when no data
      return Array(20).fill(0).map(() => Math.random() * 0.15);
    }
    
    // Normalize and sample the audio data
    const maxValue = Math.max(...audioData, 1);
    return audioData
      .filter((_, index) => index % 2 === 0)
      .slice(0, 20)
      .map(value => value / maxValue);
  }, [audioData]);
  
  return (
    <div 
      className={cn(
        "flex items-center justify-center h-24 w-full transition-opacity duration-300",
        !isRecording && "opacity-60",
        className
      )}
    >
      {normalizedData.map((value, index) => (
        <div
          key={index}
          className="audio-bar"
          style={{
            height: `${Math.max(4, value * 64)}px`,
            transform: isRecording 
              ? `scaleY(${Math.max(0.2, value)})` 
              : 'scaleY(0.2)',
            animationDelay: `${index * 0.05}s`
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;
