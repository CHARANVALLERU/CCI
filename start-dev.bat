@echo off
cd /d "%~dp0"

if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo.
    echo npm install failed.
    pause
    exit /b 1
  )
)

if exist ".next\dev\lock" (
  echo Stale dev lock detected — clearing .next cache...
  rmdir /s /q ".next" 2>nul
)

echo Starting Next.js dev server...
echo Browser will open at http://localhost:3000 shortly.
echo If Turbopack panics, run clean-dev.bat or: npm run dev:clean
echo.

rem Open browser after a short delay while the server boots (keeps this window on npm logs)
start "" cmd /c "timeout /t 4 /nobreak >nul & start http://localhost:3000"

call npm run dev
if errorlevel 1 (
  echo.
  echo Dev server exited with an error.
  pause
  exit /b 1
)
