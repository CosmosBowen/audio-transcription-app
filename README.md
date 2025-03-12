# Audio Transcription App

A full-stack application that records microphone audio, sends it to a backend service, and gets AI-powered transcription.

## Project Overview

This project consists of a React frontend and a FastAPI backend that work together to:
1. Record audio from a microphone
2. Process and visualize the audio in real-time
3. Send the recording to a backend API
4. Transcribe the audio using Whisper AI
5. Display the transcription results

## Tech Stack

### Frontend
- React with TypeScript
- TailwindCSS for styling
- shadcn/ui component library
- Custom hooks for audio recording
- Real-time audio visualization

### Backend
- FastAPI framework
- OpenAI Whisper (running locally)
- Python for audio processing

## Project Structure
project-root/
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── AudioRecorder.tsx        # Main recording component
│   │   │   ├── AudioVisualizer.tsx      # Visualizes audio input
│   │   │   ├── RecordButton.tsx         # Recording controls
│   │   │   └── TranscriptionDisplay.tsx # Shows transcription results
│   │   ├── hooks/           # Custom React hooks
│   │   │   └── useAudioRecorder.ts      # Audio recording functionality
│   │   ├── lib/             # Utilities and API clients
│   │   └── pages/           # Application pages
│   └── public/              # Static assets
│
└── backend/                 # FastAPI application
├── app/
│   ├── main.py          # FastAPI application setup
│   └── services/
│       └── transcription.py  # Audio transcription service
└── requirements.txt     # Python dependencies


## How to Run the Project

### Backend Setup

1. Create a virtual environment and install dependencies:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. Start the FastAPI server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
The first time you run the application, it will download the Whisper model.

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to http://localhost:8080

## Usage

1. Click the microphone button to start recording
2. Speak into your microphone
3. Click again to stop recording
4. Click "Transcribe" to send the audio to the backend
5. View the transcription results
 

## Implementation Details

### Audio Recording Process
The frontend uses the Web Audio API and MediaRecorder to capture microphone input. The useAudioRecorder hook manages the recording state and provides visualization data.


### Transcription Process

1. Audio is recorded as a WAV blob
2. The blob is sent to the FastAPI backend
3. The backend saves the file temporarily
4. Whisper processes the audio and generates a transcription
5. The transcription is returned to the frontend as JSON

