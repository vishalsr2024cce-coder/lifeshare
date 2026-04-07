# LifeShare Blood Donation Platform - Startup Script
# Run this from the project root: .\start.ps1

$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$clientDir = Join-Path $rootDir "client"
$serverDir = Join-Path $rootDir "server"

Write-Host ""
Write-Host "==========================================" -ForegroundColor Red
Write-Host "   LifeShare Blood Donation Platform" -ForegroundColor White
Write-Host "==========================================" -ForegroundColor Red
Write-Host ""

# Step 1: Install server dependencies
Write-Host "[1/4] Installing server dependencies..." -ForegroundColor Cyan
Set-Location $serverDir
if (-Not (Test-Path "node_modules")) {
    npm install
} else {
    Write-Host "      Server node_modules already exist, skipping." -ForegroundColor Gray
}

# Step 2: Install client dependencies
Write-Host "[2/4] Installing client dependencies..." -ForegroundColor Cyan
Set-Location $clientDir
if (-Not (Test-Path "node_modules")) {
    npm install
} else {
    Write-Host "      Client node_modules already exist, skipping." -ForegroundColor Gray
}

# Step 3: Build client
Write-Host "[3/4] Building React client..." -ForegroundColor Cyan
Set-Location $clientDir
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Client build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "      Client built successfully!" -ForegroundColor Green

# Step 4: Start MongoDB if not running
Write-Host "[4/4] Checking MongoDB..." -ForegroundColor Cyan
$mongoRunning = Get-Process -Name "mongod" -ErrorAction SilentlyContinue
if (-Not $mongoRunning) {
    Write-Host "      MongoDB is not running. Attempting to start..." -ForegroundColor Yellow
    $mongodPath = "C:\Program Files\MongoDB\Server\*\bin\mongod.exe"
    $mongodExe = Get-Item $mongodPath -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($mongodExe) {
        Start-Process -FilePath $mongodExe.FullName -ArgumentList "--dbpath C:\data\db" -WindowStyle Minimized
        Start-Sleep -Seconds 3
        Write-Host "      MongoDB started!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "  WARNING: Could not find mongod.exe automatically." -ForegroundColor Yellow
        Write-Host "  Please start MongoDB manually before running the server." -ForegroundColor Yellow
        Write-Host "  Common fix: Run 'mongod' in a separate terminal, or start the MongoDB service." -ForegroundColor Yellow
        Write-Host ""
    }
} else {
    Write-Host "      MongoDB is already running!" -ForegroundColor Green
}

# Step 5: Start the server
Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "   Starting server on http://localhost:5000" -ForegroundColor White
Write-Host "   Press Ctrl+C to stop" -ForegroundColor Gray
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""

Set-Location $serverDir
npm run dev
