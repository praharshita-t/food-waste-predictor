Write-Host "Starting Food Waste Predictor..." -ForegroundColor Green
Write-Host ""

Write-Host "Step 1: Starting Backend Server..." -ForegroundColor Yellow
Set-Location backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"
Start-Sleep -Seconds 3
Write-Host ""

Write-Host "Step 2: Starting Frontend Server..." -ForegroundColor Yellow
Set-Location ..\frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "node server.js"
Start-Sleep -Seconds 2
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Both servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "Backend: http://localhost:5000" -ForegroundColor White
Write-Host "Frontend: http://localhost:8000" -ForegroundColor White
Write-Host ""
Write-Host "Open http://localhost:8000 in your browser" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

