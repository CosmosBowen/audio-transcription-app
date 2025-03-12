
import React from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecordButtonProps {
  isRecording: boolean;
  isProcessing: boolean;
  recordingTime: number;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const RecordButton: React.FC<RecordButtonProps> = ({
  isRecording,
  isProcessing,
  recordingTime,
  onClick,
  className,
  disabled = false,
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <button
        onClick={onClick}
        disabled={disabled || isProcessing}
        className={cn(
          "relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 shadow-lg",
          isRecording 
            ? "bg-recording text-recording-foreground" 
            : "bg-primary text-primary-foreground hover:bg-primary/90",
          isProcessing && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {isProcessing ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : isRecording ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
        
        {isRecording && (
          <span className="absolute -inset-1 rounded-full border-2 border-recording animate-pulse-recording" />
        )}
      </button>
      
      {isRecording && (
        <div className="text-sm font-medium animate-fade-in">
          {formatTime(recordingTime)}
        </div>
      )}
    </div>
  );
};

export default RecordButton;
