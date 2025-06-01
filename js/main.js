/**
 * TikTok Profile Scraper - Main Entry Point
 * メインエントリーポイント
 */

import { DOMElements } from './dom-manager.js';
import { UIManager } from './ui-manager.js';
import { TikTokAnalyzer } from './tiktok-analyzer.js';

// 設定
const CONFIG = {
    // trueでPHP使用、falseでAllOrigins API使用
    USE_PHP: false
};

document.addEventListener('DOMContentLoaded', function () {
    // DOM要素を初期化
    const elements = new DOMElements();
    
    // UIマネージャーを初期化
    const uiManager = new UIManager(elements);
    
    // TikTok解析機能を初期化（コンフィグを渡す）
    const analyzer = new TikTokAnalyzer(elements, uiManager, CONFIG);

    // イベントリスナーの設定
    setupEventListeners(elements, analyzer, uiManager);
});

/**
 * イベントリスナーを設定する
 */
function setupEventListeners(elements, analyzer, uiManager) {
    // 詳細情報の表示/非表示切り替え
    elements.toggleAdvancedBtn.addEventListener('click', function () {
        uiManager.toggleAdvancedInfo();
    });

    // Enterキーで解析実行
    elements.tiktokIdInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            elements.analyzeBtn.click();
        }
    });

    // 解析ボタンのクリックイベント
    elements.analyzeBtn.addEventListener('click', async function () {
        await analyzer.analyzeTikTokProfile();
    });
}