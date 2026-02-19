export const initTextSlider = () => {
    document.addEventListener("DOMContentLoaded", function () {
        // 共通の設定オプションを定義
        const defaultOptions = {
            type: "loop",
            drag: false,
            arrows: false,
            pagination: false,
            autoWidth: true,
            autoScroll: {
                speed: 0.4,
                pauseOnHover: false,
            },
        }; // 共通の関数でカルーセルを初期化
        function initSplide(selector, customOptions = {}) {
            const element = document.querySelector(selector);
            if (element) {
                // 要素が存在する場合のみ処理を実行
                const options = { ...defaultOptions, ...customOptions }; // デフォルト設定とカスタム設定をマージ
                const splide = new Splide(element, options); // Splideインスタンスを作成
                splide.mount(window.splide.Extensions); // Splideを初期化し、拡張機能を有効化
            }
        } // 各カルーセルを初期化
        initSplide(".js-keyword-carousel-ltr", {}); // 左から右のスライダー
        initSplide(".js-keyword-carousel-rtl", { direction: "rtl" }); // 右から左のスライダー
        initSplide(".js-keyword-carousel-footer", {});
        initSplide(".js-keyword-carousel-works", {});
        initSplide(".js-keyword-carousel-works-bottom", {});
    });
};
