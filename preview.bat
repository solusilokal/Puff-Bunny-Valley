@echo off
echo ===================================================
echo   Menjalankan Puff Bunny Valley Preview Server
echo ===================================================
echo.
cd /d "%~dp0"
start "" http://localhost:5173
call npm.cmd run dev
pause
