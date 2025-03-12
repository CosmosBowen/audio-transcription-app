import os
import tempfile
import openai
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

async def transcribe_audio(audio_content: bytes) -> str:
    # Save audio to a temporary file
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as temp_audio:
        temp_audio.write(audio_content)
        temp_path = temp_audio.name
    
    try:
        # Use OpenAI Whisper API for transcription
        with open(temp_path, "rb") as audio_file:
            response = openai.Audio.transcribe(
                model="whisper-1",
                file=audio_file
            )
        return response["text"]
    finally:
        # Clean up the temporary file
        if os.path.exists(temp_path):
            os.remove(temp_path)