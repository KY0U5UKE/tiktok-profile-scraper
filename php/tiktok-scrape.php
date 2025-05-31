<?php
/**
 * TikTok Profile Scraper - API Endpoint
 * TikTokプロフィール取得APIエンドポイント
 */

// レスポンスヘッダーの設定
header('Content-Type: application/json');          // JSONレスポンスを指定
header('Access-Control-Allow-Origin: *');          // CORS設定：全てのオリジンからのアクセスを許可
header('Access-Control-Allow-Methods: GET');       // 許可するHTTPメソッドを指定

// パラメータの検証
if (!isset($_GET['id']) || empty($_GET['id'])) {
    // TikTok IDが指定されていない場合はエラーを返す
    echo json_encode(['error' => 'TikTok ID is required']);
    exit;
}

// TikTok IDのサニタイズ（セキュリティ対策）
// 英数字、アンダースコア、ピリオドのみを許可
$tiktok_id = preg_replace('/[^a-zA-Z0-9_.]/', '', $_GET['id']);

// TikTokプロフィールURLの構築
$url = "https://tiktok.com/@" . $tiktok_id;

// HTTP リクエストのオプション設定
$options = [
    'http' => [
        'method' => 'GET',
        // ブラウザのUser-Agentを偽装してアクセス
        // TikTokがボットアクセスをブロックする可能性があるため
        'header' => 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    ]
];

// HTTPコンテキストの作成
$context = stream_context_create($options);

// TikTokプロフィールページのHTMLを取得
// @マークでエラーを抑制し、失敗時の処理を後で行う
$html = @file_get_contents($url, false, $context);

// HTMLの取得に失敗した場合の処理
if ($html === false) {
    echo json_encode(['error' => 'Failed to fetch TikTok profile']);
    exit;
}

// 成功時：取得したHTMLをJSON形式で返す
echo json_encode(['html' => $html]);
?>