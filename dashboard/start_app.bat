@echo off


where /q node || (
    echo Node.js is not installed. Please install Node.js and try again.
    exit /b 1
)

where /q npm || (
    echo npm is not installed. Please install npm and try again.
    exit /b 1
)

REM Navigate to the backend directory
cd ..\backend

REM Install backend dependencies (only run if not already installed)
if not exist "node_modules" (
    npm install
)

REM Start the backend server
start npm run dev

REM Wait for a few seconds to allow the backend server to start before starting the frontend
timeout /t 5

REM Navigate to the frontend directory
cd ..\frontend

REM Install frontend dependencies (only run if not already installed)
if not exist "node_modules" (
    npm install
)

REM Start the frontend server
start npm start