
import React from 'react';
import AudioRecorder from '@/components/AudioRecorder';
import { Toaster } from 'sonner';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/50 p-6 md:p-10">
      <Toaster position="top-center" />
      
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Talk to Text Buddy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Record your voice and get instant AI-powered transcriptions with beautiful visualizations
          </p>
        </header>
        
        <main>
          <AudioRecorder />
        </main>
        
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>
            Record, transcribe, and share your thoughts effortlessly.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
