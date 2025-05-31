/**
 * Utility Functions
 * 共通で使用されるユーティリティ関数集
 */

export class Utils {
    /**
     * 数値を読みやすい形式にフォーマット
     */
    static formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    /**
     * 設定値を読みやすいテキストに変換
     */
    static translateSetting(value) {
        if (value === undefined || value === null) return '不明';

        switch (parseInt(value)) {
            case 0: return '全員許可';
            case 1: return 'フォロワーのみ';
            case 2: return 'フレンドのみ';
            case 3: return '非公開';
            default: return `設定値: ${value}`;
        }
    }

    /**
     * デフォルトアバターのSVGを生成
     */
    static getDefaultAvatarSVG() {
        const svgContent = `
<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="0" y="0" width="300" height="300" fill="#888" />
    <path fill-rule="evenodd" clip-rule="evenodd"
        d="M58.74 269.054C74.383 234.242 109.361 210 150 210s75.617 24.242 91.26 59.054C215.978 288.463 184.336 300 150 300c-34.336 0-65.978-11.537-91.26-30.946z"
        fill="#fff" fill-opacity=".75" />
    <circle cx="150" cy="138" r="55" fill="#fff" fill-opacity=".75" />
</svg>
`;
        return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgContent);
    }

    /**
     * 文字列をサニタイズ
     */
    static sanitizeString(str) {
        if (typeof str !== 'string') return '';
        return str.replace(/[<>\"'&]/g, function(match) {
            switch (match) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '"': return '&quot;';
                case "'": return '&#39;';
                case '&': return '&amp;';
                default: return match;
            }
        });
    }

    /**
     * URLのバリデーション
     */
    static isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    /**
     * TikTok IDのバリデーション
     */
    static isValidTikTokId(id) {
        // TikTok IDは英数字、アンダースコア、ピリオドのみ許可
        const regex = /^[a-zA-Z0-9_.]+$/;
        return regex.test(id) && id.length >= 1 && id.length <= 24;
    }

    /**
     * 日付を日本語形式でフォーマット
     */
    static formatDateJP(timestamp) {
        if (!timestamp) return '不明';
        
        try {
            const date = new Date(timestamp * 1000);
            return date.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            console.error('日付フォーマットエラー:', error);
            return '不明';
        }
    }

    /**
     * エラーメッセージを統一フォーマットで作成
     */
    static createErrorMessage(type, details = '') {
        const errorMessages = {
            'network': 'ネットワークエラーが発生しました',
            'parse': 'データの解析に失敗しました',
            'notfound': 'ユーザーが見つかりません',
            'invalid': '無効な入力です',
            'timeout': 'リクエストがタイムアウトしました',
            'unknown': '不明なエラーが発生しました'
        };

        const baseMessage = errorMessages[type] || errorMessages['unknown'];
        return details ? `${baseMessage}: ${details}` : baseMessage;
    }

    /**
     * デバウンス関数
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * 深いオブジェクトのクローンを作成
     */
    static deepClone(obj) {
        if (obj === null || typeof obj !== "object") return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => Utils.deepClone(item));
        if (typeof obj === "object") {
            const cloned = {};
            Object.keys(obj).forEach(key => {
                cloned[key] = Utils.deepClone(obj[key]);
            });
            return cloned;
        }
    }
}