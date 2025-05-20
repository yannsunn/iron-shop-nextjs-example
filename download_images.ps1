# PowerShell画像ダウンロードスクリプト

# 画像ダウンロード用関数
function Download-Image {
    param (
        [string]$Url,
        [string]$OutputPath
    )
    
    try {
        Invoke-WebRequest -Uri $Url -OutFile $OutputPath
        Write-Host "画像をダウンロードしました: $OutputPath" -ForegroundColor Green
    }
    catch {
        Write-Host "エラー: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# ダウンロード先のディレクトリを確認
if (-not (Test-Path -Path ".\images")) {
    New-Item -Path ".\images" -ItemType Directory
    Write-Host "imagesディレクトリを作成しました。" -ForegroundColor Yellow
}

# サンプル画像をダウンロード
Write-Host "サンプル画像のダウンロードを開始します..." -ForegroundColor Cyan

# 商品画像のサンプル
$ironUrls = @(
    "https://images.unsplash.com/photo-1581686604777-8e48eb5e2e51?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1597325750908-8c0e09fc0fd6?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581687625563-de5ed235d542?q=80&w=1000&auto=format&fit=crop"
)

for ($i = 0; $i -lt $ironUrls.Count; $i++) {
    $index = $i + 1
    Download-Image -Url $ironUrls[$i] -OutputPath ".\images\iron$index.jpg"
}

# ヒーロー画像
Download-Image -Url "https://images.unsplash.com/photo-1638599925594-a84e73718727?q=80&w=1024&auto=format&fit=crop" -OutputPath ".\images\hero.jpg"

Write-Host "ダウンロード完了！" -ForegroundColor Cyan
Write-Host "注意: これらはUnsplashからのサンプル画像です。商用利用には適切な権利確認をしてください。" -ForegroundColor Yellow 