/**
 * TikTok Profile Scraper - UI Manager
 * ユーザーインターフェースの状態管理と表示制御を行うクラス
 */

import { Utils } from './utils.js';

export class UIManager {
    constructor(elements) {
        this.elements = elements;
    }

    /**
     * 詳細情報の表示/非表示を切り替え
     */
    toggleAdvancedInfo() {
        const metaContainer = this.elements.metaContainer;
        const toggleBtn = this.elements.toggleAdvancedBtn;

        if (metaContainer.style.display === 'none' || metaContainer.style.display === '') {
            // 詳細情報を表示する場合
            metaContainer.style.display = 'block';
            metaContainer.classList.remove('slide-up');
            metaContainer.classList.add('slide-down');

            // アニメーション後にコンテンツをフェードイン
            setTimeout(() => {
                metaContainer.classList.add('active');
            }, 150);

            toggleBtn.innerHTML = '<i class="fas fa-times"></i> 詳細情報を隠す';
        } else {
            // 詳細情報を隠す場合
            metaContainer.classList.remove('active');
            metaContainer.classList.remove('slide-down');
            metaContainer.classList.add('slide-up');

            // アニメーション完了後に非表示に
            setTimeout(() => {
                metaContainer.style.display = 'none';
            }, 500);

            toggleBtn.innerHTML = '<i class="fas fa-cog"></i> 詳細情報を表示';
        }
    }

    /**
     * ローディング状態を表示
     */
    showLoading() {
        this.elements.loaderContainer.style.display = 'flex';
        this.elements.resultContainer.style.display = 'none';
        this.elements.errorContainer.style.display = 'none';
        this.hideAdvancedInfo();
    }

    /**
     * エラーメッセージを表示
     */
    showError(message) {
        this.elements.errorText.textContent = message;
        this.elements.errorContainer.style.display = 'block';
        this.elements.loaderContainer.style.display = 'none';
    }

    /**
     * 結果を表示
     */
    showResult() {
        this.elements.loaderContainer.style.display = 'none';
        this.elements.resultContainer.style.display = 'block';

        // 結果コンテナを滑らかに表示
        this.elements.resultContainer.style.opacity = '0';
        setTimeout(() => {
            this.elements.resultContainer.style.opacity = '1';
            this.elements.resultContainer.style.transition = 'opacity 0.5s ease';
        }, 50);
    }

    /**
     * 詳細情報を隠してボタンをリセット
     */
    hideAdvancedInfo() {
        const metaContainer = this.elements.metaContainer;
        const toggleBtn = this.elements.toggleAdvancedBtn;

        metaContainer.style.display = 'none';
        metaContainer.classList.remove('active', 'slide-down', 'slide-up');
        toggleBtn.innerHTML = '<i class="fas fa-cog"></i> 詳細情報を表示';
    }

    /**
     * ユーザーデータでUIを更新
     */
    updateUI(userData, stats) {
        this.updateBasicProfile(userData);
        this.updateStats(stats);
        this.updateMetadata(userData);
        this.updateSettings(userData);
        this.updateOtherInfo(userData);
    }

    /**
     * 基本プロフィール情報を更新
     */
    updateBasicProfile(userData) {
        const profile = this.elements.profileElements;

        // ニックネーム（認証バッジ付き）
        profile.nickname.textContent = userData.nickname || '';
        if (userData.verified) {
            profile.nickname.innerHTML += ' <i class="fas fa-check-circle verified-badge"></i>';
        }

        // ユニークID
        profile.uniqueId.textContent = '@' + (userData.uniqueId || '');

        // 署名
        profile.signature.textContent = userData.signature || '';

        // プロフィールリンクの設定
        const profileUrl = `https://tiktok.com/@${userData.uniqueId}`;
        if (profile.avatarLink) profile.avatarLink.href = profileUrl;
        if (profile.infoLink) profile.infoLink.href = profileUrl;

        // アバター画像の設定
        this.updateAvatar(userData.avatarLarger);
    }

    /**
     * アバター画像を更新
     */
    updateAvatar(avatarUrl) {
        const avatar = this.elements.profileElements.avatar;
        if (!avatar) return;

        // URLをクリーンアップ
        const cleanUrl = avatarUrl ? avatarUrl.replace(/\\/g, '') : '';
        avatar.src = cleanUrl;

        // エラー時のフォールバック
        avatar.onerror = function () {
            this.onerror = null; // 無限ループ防止
            this.src = Utils.getDefaultAvatarSVG();
        };
    }

    /**
     * 統計情報を更新
     */
    updateStats(stats) {
        const statsElements = this.elements.statsElements;

        if (statsElements.followerCount) {
            statsElements.followerCount.textContent = Utils.formatNumber(stats.followerCount || 0);
        }
        if (statsElements.followingCount) {
            statsElements.followingCount.textContent = Utils.formatNumber(stats.followingCount || 0);
        }
        if (statsElements.videoCount) {
            statsElements.videoCount.textContent = Utils.formatNumber(stats.videoCount || 0);
        }
        if (statsElements.heartCount) {
            statsElements.heartCount.textContent = Utils.formatNumber(stats.heartCount || 0);
        }
        if (statsElements.friendCount) {
            statsElements.friendCount.textContent = Utils.formatNumber(stats.friendCount || 0);
        }
    }

    /**
     * メタデータを更新
     */
    updateMetadata(userData) {
        const meta = this.elements.metaElements;

        if (meta.accountId) meta.accountId.textContent = userData.id || '';
        if (meta.secUid) meta.secUid.textContent = userData.secUid || '';
        if (meta.shortId) meta.shortId.textContent = userData.shortId || '未設定';

        // 作成時間をフォーマット
        if (meta.createTime) {
            if (userData.createTime) {
                const date = new Date(userData.createTime * 1000);
                meta.createTime.textContent = date.toLocaleDateString('ja-JP');
            } else {
                meta.createTime.textContent = '不明';
            }
        }

        // ニックネーム変更時間をフォーマット
        if (meta.nicknameModifyTime) {
            if (userData.nickNameModifyTime) {
                const date = new Date(userData.nickNameModifyTime * 1000);
                meta.nicknameModifyTime.textContent = date.toLocaleDateString('ja-JP');
            } else {
                meta.nicknameModifyTime.textContent = '不明';
            }
        }

        if (meta.verified) meta.verified.textContent = userData.verified ? 'はい' : 'いいえ';
        if (meta.privateAccount) meta.privateAccount.textContent = userData.privateAccount ? 'はい' : 'いいえ';
        if (meta.region) meta.region.textContent = userData.region || '不明';
        if (meta.language) meta.language.textContent = userData.language || '不明';
    }

    /**
     * 設定情報を更新
     */
    updateSettings(userData) {
        const settings = this.elements.settingsElements;

        if (settings.commentSetting) {
            settings.commentSetting.textContent = Utils.translateSetting(userData.commentSetting);
        }
        if (settings.duetSetting) {
            settings.duetSetting.textContent = Utils.translateSetting(userData.duetSetting);
        }
        if (settings.stitchSetting) {
            settings.stitchSetting.textContent = Utils.translateSetting(userData.stitchSetting);
        }
        if (settings.downloadSetting) {
            settings.downloadSetting.textContent = Utils.translateSetting(userData.downloadSetting);
        }
    }

    /**
     * その他の情報を更新
     */
    updateOtherInfo(userData) {
        const other = this.elements.otherElements;

        if (other.ftc) other.ftc.textContent = userData.ftc ? 'はい' : 'いいえ';
        if (other.openFavorite) other.openFavorite.textContent = userData.openFavorite ? 'はい' : 'いいえ';
        if (other.ttSeller) other.ttSeller.textContent = userData.ttSeller ? 'はい' : 'いいえ';

        // commerceUserInfoが存在し、commerceUserプロパティがあるかチェック
        if (other.commerceUser) {
            if (userData.commerceUserInfo && typeof userData.commerceUserInfo.commerceUser !== 'undefined') {
                other.commerceUser.textContent = userData.commerceUserInfo.commerceUser ? 'はい' : 'いいえ';
            } else {
                other.commerceUser.textContent = '不明';
            }
        }
    }
}