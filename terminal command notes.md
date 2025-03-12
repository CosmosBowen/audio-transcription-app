## frontend run:

NODE_ENV=development npm run dev

-------------
## backend run:

// While in your backend directory with the virtual environment activated
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

// but what it's for:
cd backend
docker build -t audio-transcription-api .
docker run -p 8000:8000 -e OPENAI_API_KEY=your_api_key audio-transcription-api