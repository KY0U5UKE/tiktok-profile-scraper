# TikTok  Scraper

![Demo](assets/demo.gif)

TikTokの基本的なユーザープロフィール情報を取得・表示するWebアプリケーションです。ユーザー名を入力するだけで、フォロワー数、フォロー数、投稿数などの詳細な統計情報を取得できます。

## 主な機能

- ユーザー名、表示名、プロフィール画像などの基本情報
- フォロワー数、フォロー数、いいね数、投稿数の詳細解析
- デスクトップ・モバイル両対応

## デモ

**Live Demo**: [https://KY0U5UKE.github.io/tiktok-profile-scraper/](https://ky0u5uke.github.io/tiktok-profile-scraper/)

## セットアップ方法

このツールは2つの方法で使用できます。

### 方法1: 簡単セットアップ（初心者向け）

サーバー不要で、すぐに使い始められます。

#### 必要な環境
- モダンなWebブラウザ（Chrome, Firefox, Safari, Edge の最新版）

#### 手順
1. **リポジトリをクローン**
   ```bash
   git clone https://github.com/KY0U5UKE/tiktok-profile-scraper.git
   cd tiktok-profile-scraper
   ```

2. **設定を確認**
   
   `js/main.js` ファイルを開き、以下の設定になっていることを確認してください
   ```js
   const CONFIG = {
       USE_PHP: false  // ← falseになっていることを確認
   };
   ```

3. **起動**
   
   `index.html` をダブルクリックしてブラウザで開くだけ！

#### メリット・デメリット
- ✅ サーバー設定不要
- ✅ すぐに使える
- ❌ 外部API（AllOrigins）に依存しているため、やや不安定
- ❌ レスポンスが遅い

### 方法2: PHPサーバー使用（推奨・上級者向け）

より安定した動作が期待できます。

#### 必要な環境
- **Webサーバー**: Apache/Nginx（PHPサポート必須）
- **PHP**: 7.4以上
- **ブラウザ**: モダンなWebブラウザ

#### 手順

**1. リポジトリをクローン**
```bash
git clone https://github.com/KY0U5UKE/tiktok-profile-scraper.git
cd tiktok-profile-scraper
```

**2. Webサーバーに配置**

<details>
<summary>Apache/Nginxサーバーの場合</summary>

```bash
# Webサーバーのドキュメントルートにファイルをコピー
sudo cp -r tiktok-profile-scraper/ /var/www/html/

# 権限設定
sudo chown -R www-data:www-data /var/www/html/tiktok-profile-scraper/
sudo chmod -R 755 /var/www/html/tiktok-profile-scraper/
```
</details>

<details>
<summary>XAMPP使用の場合</summary>

```bash
# htdocsフォルダにコピー
cp -r tiktok-profile-scraper/ C:/xampp/htdocs/
```
</details>

<details>
<summary>MAMP使用の場合</summary>

```bash
# htdocsフォルダにコピー
cp -r tiktok-profile-scraper/ /Applications/MAMP/htdocs/
```
</details>

**3. 設定変更**

`js/main.js` ファイルを開き、以下のように変更してください
```js
const CONFIG = {
    USE_PHP: true  // ← trueに変更
};
```

**4. PHP設定確認**

`php.ini`で以下の設定が有効になっていることを確認してください
```ini
allow_url_fopen = On
curl.cainfo = "path/to/cacert.pem"  # HTTPS通信用
```

**5. 動作確認**

ブラウザで以下のURLにアクセス
```
http://localhost/tiktok-profile-scraper/
```

#### メリット・デメリット
- ✅ 安定している
- ✅ レスポンスが高速
- ✅ 外部APIに依存しない
- ❌ サーバー環境が必要

## 使用方法

### 基本的な使い方

1. TikTokのユーザー名を入力フィールドに入力
2. 「解析開始」ボタンをクリック
3. プロフィール情報と統計データが表示されます

### 入力形式

以下の形式で入力できます

```
# ユーザー名のみ
tiktok

# URL形式
tiktok.com/@tiktok
www.tiktok.com/@tiktok
https://tiktok.com/@tiktok
https://www.tiktok.com/@tiktok

# UID（数字）
107955

# secUID（非推奨・不安定）
MS4wLjABAAAAv7iSuuXDJGDvJkmH_vz1qkDZYo1apxgzaxdBSeIuPiM
```

## カスタマイズ

### テーマカラーの変更

`css/variables.css` でカラーパレットを変更できます

```css
:root {
    /* カラーパレット */
    --primary-color: #17a2b8;      /* メインカラー（青緑） */
    --secondary-color: #f8f9fa;    /* セカンダリカラー（薄いグレー） */
    --text-color: #212529;         /* メインテキストカラー */
    --light-grey: #e9ecef;         /* 薄いグレー */
    --dark-grey: #6c757d;          /* 濃いグレー */
    
    /* エフェクト */
    --shadow: 0 4px 6px rgba(0, 0, 0, .1);           /* 標準シャドウ */
    --shadow-hover: 0 6px 12px rgba(0, 0, 0, .15);   /* ホバー時シャドウ */
...
```

### データ取得方法の切り替え

設定変更は `js/main.js` で行います

```js
const CONFIG = {
    USE_PHP: false  // AllOrigins API使用
    // USE_PHP: true   // PHP使用（コメントアウト時）
};
```

## プロジェクト構造

```
tiktok-profile-scraper/
├── index.html                  # メインHTMLファイル
├── README.md                   # このファイル
├── assets/
│   └── demo.gif               # デモ画像
├── css/                       # スタイルシート
│   ├── variables.css          # CSS変数定義
│   ├── base.css               # 基本スタイル
│   ├── animations.css         # アニメーション
│   ├── header.css             # ヘッダー部分
│   ├── profile.css            # プロフィール表示
│   ├── stats.css              # 統計情報表示
│   ├── meta.css               # 詳細情報表示
│   ├── utils.css              # ユーティリティ
│   ├── responsive.css         # レスポンシブデザイン
│   └── main.css               # メインエントリーポイント
├── js/                        # JavaScript
│   ├── utils.js               # ユーティリティ関数
│   ├── dom-manager.js         # DOM要素管理
│   ├── ui-manager.js          # UI管理
│   ├── tiktok-analyzer.js     # データ解析
│   └── main.js                # メインエントリーポイント
└── php/
    └── tiktok-scrape.php      # PHP API（サーバー使用時）
```

## トラブルシューティング

### よくある問題

**Q: データが取得できない**
- ネットワーク接続を確認
- しばらく時間をおいてから再試行する

**Q: PHPモードでエラーが発生する**
- Webサーバーが正しく動作しているか確認
- `php.ini`の設定を確認
- ファイルの権限設定を確認

**Q: レスポンスが遅い**
- PHPモードを使用する
- ネットワーク接続を確認

## ライセンス

このプロジェクトは [MIT License](LICENSE) のもとで公開されています。

## 免責事項

- このツールは教育・研究目的で作成されています
- TikTokの利用規約を遵守してご使用ください
- 商用利用や過度な使用はお控えください
- データの正確性や可用性は保証されません
- 利用により生じた損害について、作者は一切の責任を負いません

## サポート・お問い合わせ

****: [GitHub ](https://github.com/KY0U5UKE/tiktok-profile-scraper/issues)

**作者**: [きょうすけ](https://github.com/KY0U5UKE)

---

**Made with ❤️ by [きょうすけ](https://github.com/KY0U5UKE)**
