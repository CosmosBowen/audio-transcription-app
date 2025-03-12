from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from .services.transcription import transcribe_audio

app = FastAPI(
    title="Audio Transcription API",
    description="API for transcribing audio recordings",
    version="1.0.0",
    docs_url="/api/docs",  # Custom docs URL
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/transcribe")
async def transcribe(audio: UploadFile = File(...)):
    content = await audio.read()
    result = await transcribe_audio(content)
    print(f"Transcription result: {result}")  # Add debug log
    return {"transcript": result}