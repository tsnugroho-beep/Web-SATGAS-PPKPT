@echo off
chcp 65001 >nul
echo ======================================================
echo   🚀 SINKRONISASI OTOMATIS KE GITHUB
echo ======================================================
echo.

git add .
set /p msg="Masukkan pesan perubahan (Tekan ENTER untuk langsung kirim): "
if "%msg%"=="" set msg=Update website otomatis

git commit -m "%msg%"
echo.
echo Mengirim perubahan ke GitHub...
git push origin main

echo.
echo ======================================================
echo   ✅ SELESAI! Website online Anda sedang diperbarui.
echo ======================================================
pause

