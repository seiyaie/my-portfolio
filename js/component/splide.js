export const textSlider = () => {
    document.addEventListener("DOMContentLoaded", function () {
        // 共通の設定オプションを定義
        const defaultOptions = {
            type: "loop", // スライダーを無限ループさせる
            drag: false, // フリードラッグを有効化
            arrows: false, // ナビゲーション矢印を非表示
            pagination: false, // ページネーションを非表示
            autoWidth: true, // 各スライドの幅を自動調整
            // gap: 8, // スライド間の間隔
            autoScroll: {
                speed: 0.4, // 自動スクロールの速度
                pauseOnHover: false, // ホバー時にスクロールを一時停止
                // pauseOnFocus: false, // フォーカス時の一時停止を無効化
            },
        }; // 共通の関数でカルーセルを初期化
        function initSplide(selector, customOptions = {}) {
            const element = document.querySelector(selector); // 指定されたセレクタの要素を取得
            if (element) {
                // 要素が存在する場合のみ処理を実行
                const options = { ...defaultOptions, ...customOptions }; // デフォルト設定とカスタム設定をマージ
                const splide = new Splide(element, options); // Splideインスタンスを作成
                splide.mount(window.splide.Extensions); // Splideを初期化し、拡張機能を有効化
            }
        } // 各カルーセルを初期化
        initSplide(".js-keyword-carousel-ltr", {}); // 左から右のスライダー
        initSplide(".js-keyword-carousel-rtl", { direction: "rtl" }); // 右から左のスライダー { autoScroll: { speed: -0.4}}でも可能
        initSplide(".js-keyword-carousel-footer", {});
    });
};
