@echo off
cd /d "%~dp0"

echo Removing .next cache (fixes Turbopack ENOENT / corrupt SST)...
if exist ".next" (
  rmdir /s /q ".next"
  if errorlevel 1 (
    echo Failed to remove .next — close the dev server and retry.
    pause
    exit /b 1
  )
)

call "%~dp0start-dev.bat"
