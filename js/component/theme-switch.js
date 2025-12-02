export const initThemeSwitch = () => {
    // DOM取得
    const themeButtons = document.querySelectorAll(".js-theme-button");
    const themeIcons = document.querySelectorAll(".js-theme-icon");
    const logoImg = document.querySelector(".js-theme-logo");
    const panelImg = document.querySelector(".js-theme-panel");
    const arrowImg = document.querySelector(".js-theme-arrow");
    const hamburgerOpenImg = document.querySelector(".js-theme-hamburger-open");
    const hamburgerCloseImg = document.querySelector(".js-theme-hamburger-close");

    // 画像パス
    const ICON = {
        light: "/img/icons/system/light-mode.svg",
        dark: "/img/icons/system/dark-mode.svg",
    };

    const LOGO = {
        light: "/img/logo/logo-black.svg",
        dark: "/img/logo/logo-white.svg",
    };

    const PANEL = {
        light: "/img/icons/ui/slider-toggle-panel-white.svg",
        dark: "/img/icons/ui/slider-toggle-panel-black.svg",
    };

    const ARROW = {
        light: "/img/icons/ui/slider-arrow-black.svg",
        dark: "/img/icons/ui/slider-arrow-white.svg",
    };

    const HAMBURGER_OPEN = {
        light: "/img/icons/ui/hamburger-open-button-black.svg",
        dark: "/img/icons/ui/hamburger-open-button-white.svg",
    };

    const HAMBURGER_CLOSE = {
        light: "/img/icons/ui/hamburger-close-button-black.svg",
        dark: "/img/icons/ui/hamburger-close-button-white.svg",
    };

    // テーマ状態管理オブジェクト
    const themeStore = {
        DARK: "dark",
        LIGHT: "light",

        // 現在のテーマを取得
        get theme() {
            const saved = localStorage.getItem("theme");
            return saved ? saved : this.DARK; // 初期値はDARKモード
        },

        set theme(value) {
            localStorage.setItem("theme", value);
            document.documentElement.setAttribute("data-theme", value);
        },
    };

    function updateTheme(theme) {
        themeStore.theme = theme; // setter呼び出し。updateThemeに渡されたthemeがsetterのvalueに入る。
        const isDark = theme === themeStore.DARK;

        // すべてのボタンのアイコンを更新
        themeIcons.forEach((icon) => {
            icon.src = isDark ? ICON.light : ICON.dark;
        });

        // logo切り替え
        if (logoImg) logoImg.src = isDark ? LOGO.dark : LOGO.light;
        // kv sliderのtoggleボタンのpanel切り替え
        if (panelImg) panelImg.src = isDark ? PANEL.dark : PANEL.light;
        // kv sliderのtoggleボタンのarrow切り替え
        if (arrowImg) arrowImg.src = isDark ? ARROW.dark : ARROW.light;
        if (hamburgerOpenImg) hamburgerOpenImg.src = isDark ? HAMBURGER_OPEN.dark : HAMBURGER_OPEN.light;
        if (hamburgerCloseImg) hamburgerCloseImg.src = isDark ? HAMBURGER_CLOSE.dark : HAMBURGER_CLOSE.light;

        // すべてのボタンの状態（aria とクラス）更新
        themeButtons.forEach((btn) => {
            btn.classList.toggle("is-dark", isDark);
            btn.setAttribute("aria-pressed", isDark);
            btn.setAttribute("aria-label", isDark ? "ライトモードに切り替え" : "ダークモードに切り替え");
        });
    }

    updateTheme(themeStore.theme); // getter呼び出し。

    // すべてのテーマボタンにイベントを付与
    themeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const newTheme = themeStore.theme === themeStore.DARK ? themeStore.LIGHT : themeStore.DARK;
            updateTheme(newTheme);
        });
    });
};
