/**
 * TikTok Profile Scraper - DOM Elements Manager
 * DOM要素の取得と管理を行うクラス
 */

export class DOMElements {
    constructor() {
        // メインコントロール要素
        this.analyzeBtn = document.getElementById('analyze-btn');
        this.tiktokIdInput = document.getElementById('tiktok-id');
        this.loaderContainer = document.getElementById('loader');
        this.resultContainer = document.getElementById('result-container');
        this.errorContainer = document.getElementById('error-container');
        this.errorText = document.getElementById('error-text');
        this.toggleAdvancedBtn = document.getElementById('toggle-advanced');
        this.metaContainer = document.getElementById('meta-container');

        // プロフィール基本情報要素
        this.profileElements = {
            avatar: document.getElementById('profile-avatar'),
            nickname: document.getElementById('profile-nickname'),
            uniqueId: document.getElementById('profile-uniqueid'),
            signature: document.getElementById('profile-signature'),
            avatarLink: document.getElementById('profile-avatar-link'),
            infoLink: document.getElementById('profile-info-link')
        };

        // 統計情報要素
        this.statsElements = {
            followerCount: document.getElementById('follower-count'),
            followingCount: document.getElementById('following-count'),
            videoCount: document.getElementById('video-count'),
            heartCount: document.getElementById('heart-count'),
            friendCount: document.getElementById('friend-count')
        };

        // メタデータ要素
        this.metaElements = {
            accountId: document.getElementById('account-id'),
            secUid: document.getElementById('sec-uid'),
            shortId: document.getElementById('short-id'),
            createTime: document.getElementById('create-time'),
            nicknameModifyTime: document.getElementById('nickname-modify-time'),
            verified: document.getElementById('verified'),
            privateAccount: document.getElementById('private-account'),
            region: document.getElementById('region'),
            language: document.getElementById('language')
        };

        // 設定情報要素
        this.settingsElements = {
            commentSetting: document.getElementById('comment-setting'),
            duetSetting: document.getElementById('duet-setting'),
            stitchSetting: document.getElementById('stitch-setting'),
            downloadSetting: document.getElementById('download-setting')
        };

        // その他の要素
        this.otherElements = {
            ftc: document.getElementById('ftc'),
            openFavorite: document.getElementById('open-favorite'),
            ttSeller: document.getElementById('tt-seller'),
            commerceUser: document.getElementById('commerce-user')
        };
    }

    /**
     * 必要な要素がすべて存在するかチェック
     */
    validateElements() {
        const requiredElements = [
            'analyzeBtn',
            'tiktokIdInput',
            'loaderContainer',
            'resultContainer',
            'errorContainer',
            'errorText'
        ];

        for (const elementName of requiredElements) {
            if (!this[elementName]) {
                throw new Error(`Required element not found: ${elementName}`);
            }
        }
    }
}