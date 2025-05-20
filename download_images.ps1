# PowerShell画像ダウンロードスクリプト

# Create images directory if it doesn't exist
New-Item -Path ".\images" -ItemType Directory -Force

# Download images using WebClient
$webClient = New-Object System.Net.WebClient

# Sample iron images from a reliable source
$urls = @(
    "https://cdn.pixabay.com/photo/2017/08/01/09/04/iron-gate-2563634_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/03/21/06/30/iron-work-3245169_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/19/15/03/iron-gate-1839733_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/08/07/12/35/iron-gate-2603500_1280.jpg"
)

try {
    # Download product images
    $webClient.DownloadFile($urls[0], ".\images\iron1.jpg")
    Write-Host "Downloaded iron1.jpg" -ForegroundColor Green
    
    $webClient.DownloadFile($urls[1], ".\images\iron2.jpg")
    Write-Host "Downloaded iron2.jpg" -ForegroundColor Green
    
    $webClient.DownloadFile($urls[2], ".\images\iron3.jpg")
    Write-Host "Downloaded iron3.jpg" -ForegroundColor Green
    
    $webClient.DownloadFile($urls[3], ".\images\hero.jpg")
    Write-Host "Downloaded hero.jpg" -ForegroundColor Green
    
    Write-Host "`nAll images downloaded successfully!" -ForegroundColor Cyan
}
catch {
    Write-Host "Error downloading images: $($_.Exception.Message)" -ForegroundColor Red
} 