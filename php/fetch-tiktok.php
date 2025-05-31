<?php
// レスポンスのContent-TypeをJSONに設定
header('Content-Type: application/json');

// クロスオリジンリクエストを許可（CORS対応）
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// パラメータ 'id' が存在しない、または空ならエラーを返して終了
if (!isset($_GET['id']) || empty($_GET['id'])) {
    echo json_encode(['error' => 'TikTok ID is required']); // TikTok IDが必要というエラーメッセージ
    exit;
}

// GETパラメータ 'id' をサニタイズ（英数字・アンダースコア・ピリオド以外を除去）
$tiktok_id = preg_replace('/[^a-zA-Z0-9_.]/', '', $_GET['id']);

// TikTokプロフィールのURLを作成
$url = "https://tiktok.com/@" . $tiktok_id;

// HTTPリクエスト用のオプションを設定（User-Agent を指定）
$options = [
    'http' => [
        'method' => 'GET',
        'header' => 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    ]
];

// コンテキストを作成
$context = stream_context_create($options);

// 指定URLからHTMLを取得（失敗時は false になる）
$html = @file_get_contents($url, false, $context);

// HTML取得に失敗した場合はエラーメッセージを返して終了
if ($html === false) {
    echo json_encode(['error' => 'Failed to fetch TikTok profile']); // TikTokプロフィールの取得失敗
    exit;
}

// 正常にHTMLを取得できた場合はJSONとして返す
echo json_encode(['html' => $html]);
?>