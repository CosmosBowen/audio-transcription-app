
import React from 'react';
import { cn } from '@/lib/utils';

interface TranscriptionDisplayProps {
  transcript: string | null;
  isProcessing: boolean;
  className?: string;
}

const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({
  transcript,
  isProcessing,
  className,
}) => {
  return (
    <div className={cn(
      "glass-panel w-full p-6 min-h-[200px] flex flex-col",
      className
    )}>
      <h2 className="text-lg font-medium mb-3 text-primary">Transcription</h2>
      
      <div className="flex-1">
        {isProcessing ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-3">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p className="text-sm text-muted-foreground">Processing audio...</p>
            </div>
          </div>
        ) : transcript ? (
          <p className="text-foreground leading-relaxed animate-fade-in">
            {transcript}
          </p>
        ) : (
          <p className="text-muted-foreground text-center italic flex items-center justify-center h-full">
            Record audio to see transcription
          </p>
        )}
      </div>
    </div>
  );
};

export default TranscriptionDisplay;
