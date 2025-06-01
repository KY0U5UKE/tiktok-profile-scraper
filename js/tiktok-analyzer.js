/**
 * TikTok Profile Scraper - TikTok Analyzer
 * TikTokプロフィールの解析処理を行うクラス
 */

export class TikTokAnalyzer {
    constructor(elements, uiManager, config) {
        this.elements = elements;
        this.uiManager = uiManager;
        this.config = config;
    }

    /**
     * TikTokプロフィールを解析する
     */
    async analyzeTikTokProfile() {
        let tiktokId = this.elements.tiktokIdInput.value.trim();

        if (!tiktokId) {
            this.uiManager.showError('TikTok IDを入力してください');
            return;
        }

        // URLからIDを抽出
        tiktokId = this.extractIdFromInput(tiktokId);
        if (!tiktokId) {
            this.uiManager.showError('入力されたURLからIDを取得できませんでした');
            return;
        }

        // ローディング状態を表示
        this.uiManager.showLoading();

        try {
            let data;
            
            if (this.config.USE_PHP) {
                // PHP経由でデータを取得
                data = await this.fetchDataViaPhp(tiktokId);
            } else {
                // AllOrigins API経由でデータを取得
                data = await this.fetchDataViaAllOrigins(tiktokId);
            }

            if (data.error) {
                this.uiManager.showError(data.error);
                return;
            }

            // HTMLからユーザーデータを抽出
            const extractedData = this.extractUserDataFromHTML(data.html);
            if (!extractedData) {
                this.uiManager.showError('ユーザーが存在しません');
                return;
            }

            const { userData, stats } = extractedData;

            // UIを更新
            this.uiManager.updateUI(userData, stats);
            this.uiManager.showResult();

        } catch (error) {
            console.error('エラー:', error);
            this.uiManager.showError('プロフィールの取得中にエラーが発生しました');
        }
    }

    /**
     * PHP経由でデータを取得
     */
    async fetchDataViaPhp(tiktokId) {
        const response = await fetch(`php/tiktok-scrape.php?id=${encodeURIComponent(tiktokId)}`);
        return await response.json();
    }

    /**
     * AllOrigins API経由でデータを取得
     */
    async fetchDataViaAllOrigins(tiktokId) {
        try {
            const tiktokUrl = `https://www.tiktok.com/@${tiktokId}`;
            const encoded = encodeURIComponent(tiktokUrl);
            const response = await fetch(`https://api.allorigins.win/raw?url=${encoded}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            return { html: html };
            
        } catch (error) {
            console.error('AllOrigins API エラー:', error);
            return { error: 'データの取得に失敗しました。しばらく時間をおいて再試行してください。' };
        }
    }

    /**
     * 入力値からTikTok IDを抽出
     */
    extractIdFromInput(input) {
        // URLからIDを抽出する処理
        if (input.includes('tiktok.com/')) {
            const regex = /tiktok\.com\/@([a-zA-Z0-9_\.]+)/i;
            const match = input.match(regex);
            return match && match[1] ? match[1] : null;
        } else if (input.startsWith('@')) {
            // @から始まる場合は@を除去
            return input.substring(1);
        }
        
        return input;
    }

    /**
     * HTMLからユーザーデータを抽出
     */
    extractUserDataFromHTML(html) {
        try {
            // 基本的なユーザー情報のマッチング
            const userInfoMatch = html.match(/{"id":"([^"]+)","shortId":"[^"]*","uniqueId":"([^"]+)","nickname":"([^"]+)","avatarLarger":"([^"]+)","avatarMedium":"([^"]+)","avatarThumb":"([^"]+)","signature":"([^"]*)"/);

            if (!userInfoMatch) {
                return null;
            }

            // 完全なユーザーデータオブジェクトを解析
            const userData = this.parseCompleteUserData(html, userInfoMatch[1]);
            if (!userData) {
                return null;
            }

            // 統計データを抽出
            const stats = this.extractStatsData(html);

            return { userData, stats };

        } catch (error) {
            console.error('データ抽出エラー:', error);
            return null;
        }
    }

    /**
     * 完全なユーザーデータを解析
     */
    parseCompleteUserData(html, userId) {
        try {
            const dataStartIndex = html.indexOf('{"id":"' + userId);
            if (dataStartIndex === -1) {
                throw new Error('ユーザーデータの開始位置が見つかりません');
            }

            let dataEndIndex = dataStartIndex;
            let braceCount = 1;

            for (let i = dataStartIndex + 1; i < html.length && braceCount > 0; i++) {
                if (html[i] === '{') braceCount++;
                else if (html[i] === '}') braceCount--;

                if (braceCount === 0) {
                    dataEndIndex = i + 1;
                    break;
                }
            }

            const userDataJson = html.substring(dataStartIndex, dataEndIndex);
            return JSON.parse(userDataJson);

        } catch (error) {
            console.error("ユーザーデータ解析エラー:", error);
            return null;
        }
    }

    /**
     * 統計データを抽出
     */
    extractStatsData(html) {
        try {
            const statsStartIndex = html.indexOf('"stats":');
            if (statsStartIndex === -1) {
                return {};
            }

            let statsEndIndex = statsStartIndex + 8; // "stats":の後から開始
            let braceCount = 1;

            for (let i = statsEndIndex + 1; i < html.length && braceCount > 0; i++) {
                if (html[i] === '{') braceCount++;
                else if (html[i] === '}') braceCount--;

                if (braceCount === 0) {
                    statsEndIndex = i + 1;
                    break;
                }
            }

            const statsJson = html.substring(statsStartIndex + 8, statsEndIndex);
            return JSON.parse(statsJson);

        } catch (error) {
            console.warn("統計データ解析エラー:", error);
            return {};
        }
    }
}