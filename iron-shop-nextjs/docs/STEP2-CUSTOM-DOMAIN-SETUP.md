# 🌐 ステップ2: カスタムドメイン設定

## 🎯 概要
独自ドメインを設定してプロフェッショナルなWebサイトを構築します。

## 📝 事前準備

### 2.1 ドメイン選択と取得（オプション）

#### 🌟 推奨ドメイン名パターン
```
アイアンショップの場合:
- iron-shop.com
- iron-works.jp
- aian-shop.com
- steel-craft.jp
- ironcraft.net
```

#### 💰 ドメイン取得サービス（価格比較）

| サービス | .com | .jp | .net | 特徴 |
|----------|------|-----|------|------|
| **お名前.com** | ¥1,408 | ¥3,124 | ¥1,628 | 日本語サポート充実 |
| **ムームードメイン** | ¥1,628 | ¥3,344 | ¥1,628 | 初心者向け |
| **Cloudflare** | $9.15 | - | $9.06 | 高速・セキュア |
| **Namecheap** | $8.88 | - | $12.98 | 海外サービス |

#### 📋 ドメイン取得手順
1. **サービス選択**: お名前.com（日本語対応）推奨
2. **ドメイン検索**: 希望ドメインの空き確認
3. **購入手続き**: 1年契約から開始推奨
4. **DNS設定権限**: 後でVercel側で設定するため保持

### 2.2 既存ドメインを使用する場合

#### ✅ 確認事項
- [ ] ドメイン管理画面へのアクセス権
- [ ] DNS設定変更権限
- [ ] ドメインの有効期限確認
- [ ] 現在のWebサイトの移行計画

## 🔧 Vercelでのドメイン設定

### Phase 1: ドメイン追加（5分）

#### 📍 手順:
1. **Vercelダッシュボード** → プロジェクト選択
2. **Settings** → **Domains** をクリック
3. **Add Domain** ボタンをクリック
4. ドメイン名入力: `your-domain.com`
5. **Add** をクリック

#### 🎛️ ドメインタイプ選択
- **Apex Domain**: `example.com`（ルートドメイン）
- **Subdomain**: `www.example.com`（サブドメイン）
- **両方設定推奨**: SEOとアクセシビリティ向上

### Phase 2: DNS設定（10-15分）

#### 🔄 設定パターン別手順

**パターンA: Apex Domain（example.com）**
```
Type: A
Name: @ (または空白)
Value: 76.76.19.61
TTL: 3600
```

**パターンB: Subdomain（www.example.com）**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**パターンC: 両方設定（推奨）**
```
# Apex Domain
Type: A
Name: @
Value: 76.76.19.61

# WWW Subdomain
Type: CNAME  
Name: www
Value: cname.vercel-dns.com

# リダイレクト設定（www → non-www）
Type: CNAME
Name: *
Value: cname.vercel-dns.com
```

#### 🏢 ドメインプロバイダー別設定画面

**お名前.com:**
1. ドメイン設定 → DNS設定 → DNSレコード設定
2. ホスト名、TYPE、VALUE を入力
3. 確認画面で設定内容を確認して完了

**ムームードメイン:**
1. コントロールパネル → ドメイン管理 → ドメイン操作
2. カスタム設定 → カスタムDNS
3. レコード追加で設定

**Cloudflare:**
1. DNS → Manage DNS → Add record
2. Type, Name, Content を入力
3. Save をクリック

### Phase 3: SSL証明書設定（自動）

#### 🔒 Vercel自動SSL
- **Let's Encrypt証明書** が自動発行
- **HTTPS強制リダイレクト** が自動設定
- **証明書更新** も自動実行

#### ⏱️ SSL有効化時間
- 通常: 5-10分
- 最大: 24時間（DNS伝播待ち）

## 🔍 設定確認と検証

### 3.1 DNS伝播確認

#### 🌐 オンラインツール
```bash
# DNS Checker
https://dnschecker.org/

# What's My DNS
https://www.whatsmydns.net/

# コマンドライン
nslookup your-domain.com
dig your-domain.com
```

### 3.2 SSL証明書確認

#### 🔐 確認方法
1. ブラウザでサイトアクセス
2. URLバーの🔒アイコンをクリック
3. 証明書情報を確認

#### ✅ 正常な状態
- 🔒 南京錠アイコン表示
- "接続は保護されています" 表示
- 証明書発行者: Let's Encrypt

### 3.3 リダイレクト確認

#### 🔄 確認すべきパターン
```bash
# HTTP → HTTPS リダイレクト
http://your-domain.com → https://your-domain.com

# WWW → Non-WWW リダイレクト（設定した場合）
https://www.your-domain.com → https://your-domain.com

# Vercelドメイン → カスタムドメイン
https://project.vercel.app → https://your-domain.com
```

## 🚨 トラブルシューティング

### よくある問題と解決法

#### 1. DNS設定が反映されない（24時間以内）
**原因**: DNS伝播に時間が必要
**解決**: 
- 設定確認後、24-48時間待機
- TTL値を短く設定（300秒）

#### 2. SSL証明書エラー
**症状**: "この接続ではプライバシーが保護されません"
**解決**:
```bash
# Vercelで強制SSL更新
1. Settings → Domains
2. 該当ドメインの "..." メニュー
3. "Refresh SSL Certificate"
```

#### 3. 無限リダイレクトループ
**原因**: DNS設定の重複または誤設定
**解決**:
1. DNS設定をクリア
2. A/CNAMEレコードを正しく再設定
3. キャッシュクリア

#### 4. ドメインが "Pending" 状態のまま
**原因**: DNS設定不備またはドメイン権限不足
**解決**:
1. ドメイン管理画面でDNS設定再確認
2. Vercelで "Refresh" 実行
3. サポートに問い合わせ

## 📊 設定完了チェックリスト

### ✅ 必須確認項目
- [ ] ドメインがVercelに正常追加
- [ ] DNS設定が正しく反映
- [ ] SSL証明書が有効
- [ ] HTTPS接続が正常
- [ ] HTTPからHTTPSへのリダイレクト動作

### ✅ 推奨確認項目
- [ ] WWWありなしの統一
- [ ] 全ページの正常表示
- [ ] 画像・CSS・JSの読み込み正常
- [ ] お問い合わせフォーム動作確認
- [ ] モバイル表示確認

## 🎯 SEO最適化（ボーナス）

### ドメイン関連SEO設定

#### 🔗 Canonical URL設定
Next.jsアプリに追加:
```typescript
// src/app/layout.tsx
export const metadata = {
  alternates: {
    canonical: 'https://your-domain.com',
  },
}
```

#### 🌐 サイトマップ更新
```typescript
// src/app/sitemap.ts
export default function sitemap() {
  return [
    {
      url: 'https://your-domain.com',
      lastModified: new Date(),
      priority: 1,
    },
    // 他のページ...
  ]
}
```

## 💰 費用まとめ

### 年間コスト概算
- **ドメイン費用**: ¥1,000-3,000/年
- **Vercelホスティング**: $0（無料プラン）
- **SSL証明書**: $0（Let's Encrypt）
- **合計**: ¥1,000-3,000/年

### 📈 プロプラン検討ポイント
- 月間アクセス数 > 100万PV
- 高速表示が必要
- Analytics詳細分析が必要

## 🔄 次のステップ

カスタムドメイン設定完了後:
1. **Step 3**: Analytics設定
2. **Google Search Console** 登録
3. **ソーシャルメディア** リンク更新

---

**⏱️ 推定所要時間: 30-60分（DNS伝播含む）**
**🎯 完了後の効果: プロフェッショナルなブランディング**