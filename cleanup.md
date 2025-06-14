# 🔥 プロジェクトクリーンアップ手順

## 削除すべきファイル（VSCodeターミナルで実行）:

```bash
cd C:\Users\march\Aian\Aian

# 空のディレクトリ削除
rmdir iron-shop-nextjs

# 不要なデプロイスクリプト削除
del force-push.ps1
del git-push.bat
del deploy.sh

# 不要な設定ファイル削除
del netlify.toml
del download_images.ps1
del image_optimizer.py
del mcp-config.json

# 不明なファイル削除
rmdir /s /q claude
rmdir /s /q ssh
del type

# MANUAL_DEPLOY.mdも不要
del MANUAL_DEPLOY.md
```

## 削除後、以下を実行:

```bash
git add -A
git commit -m "🔥 プロジェクト構造最適化 - 不要ファイル完全削除

- iron-shop-nextjsサブディレクトリ削除
- 重複デプロイスクリプト削除
- 不要な設定ファイル削除
- プロジェクト構造をクリーンに

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"
git push origin main
```

## Vercelが正しくデプロイするために:

1. Vercelダッシュボードで設定確認
2. Root Directory: 空白（デフォルト）
3. Framework: Next.js
4. 自動デプロイが開始されるはず！