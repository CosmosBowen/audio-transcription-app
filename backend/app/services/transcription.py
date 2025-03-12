import os
import tempfile
import whisper

# Load the Whisper model (only happens once when the service starts)
# Use "tiny" or "base" for faster but less accurate transcription
model = whisper.load_model("base")

async def transcribe_audio(audio_content: bytes) -> str:
    # Save audio to a temporary file
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as temp_audio:
        temp_audio.write(audio_content)
        temp_path = temp_audio.name
    
    try:
        # Use Whisper to transcribe the audio
        result = model.transcribe(temp_path)
        return result["text"]
    finally:
        # Clean up the temporary file
        if os.path.exists(temp_path):
            os.remove(temp_path)