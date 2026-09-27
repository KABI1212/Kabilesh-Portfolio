@echo off
set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"
cd /d "%~dp0"
echo ========================================================
echo   Starting Kabilesh Portfolio on http://localhost:3000
echo ========================================================
call npm run dev
