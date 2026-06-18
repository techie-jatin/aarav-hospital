@echo off
echo Starting Aarav Hospital Application...

:: Start Backend
echo Starting Python Backend on port 8000...
start cmd /k "cd app\backend && uvicorn server:app --reload --port 8000"

:: Start Frontend
echo Starting React Frontend on port 3000...
start cmd /k "cd app\frontend && npm start"

echo Application starting...
echo Backend will be available at http://localhost:8000
echo Frontend will be available at http://localhost:3000
