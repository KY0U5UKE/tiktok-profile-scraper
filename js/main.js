/**
 * TikTok Profile Scraper - Main Entry Point
 * メインエントリーポイント
 */

import { DOMElements } from './dom-manager.js';
import { UIManager } from './ui-manager.js';
import { TikTokAnalyzer } from './tiktok-analyzer.js';

document.addEventListener('DOMContentLoaded', function () {
    // DOM要素を初期化
    const elements = new DOMElements();
    
    // UIマネージャーを初期化
    const uiManager = new UIManager(elements);
    
    // TikTok分析機能を初期化
    const analyzer = new TikTokAnalyzer(elements, uiManager);

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

    // Enterキーで分析実行
    elements.tiktokIdInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            elements.analyzeBtn.click();
        }
    });

    // 分析ボタンのクリックイベント
    elements.analyzeBtn.addEventListener('click', async function () {
        await analyzer.analyzeTikTokProfile();
    });
}