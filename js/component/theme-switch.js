export const initThemeSwitch = () => {
    // DOM取得
    const themeButton = document.querySelector(".js-theme-button");
    const themeIcon = document.querySelector(".js-theme-icon");
    const logoImg = document.querySelector(".js-theme-logo");
    const panelImg = document.querySelector(".js-theme-panel");
    const arrowImg = document.querySelector(".js-theme-arrow");

    // 画像パス
    const ICON = {
        light: "img/light-mode.svg",
        dark: "img/dark-mode.svg",
    };

    const LOGO = {
        light: "img/logo-black.svg",
        dark: "img/logo-white.svg",
    };

    const PANEL = {
        light: "img/slider-toggle-panel-white.svg",
        dark: "img/slider-toggle-panel-black.svg",
    };

    const ARROW = {
        light: "img/slider-arrow-black.svg",
        dark: "img/slider-arrow-white.svg",
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

        // themeボタンのアイコン切り替え
        themeIcon.src = isDark ? ICON.light : ICON.dark;
        // logo切り替え
        if (logoImg) logoImg.src = isDark ? LOGO.dark : LOGO.light;
        // kv sliderのtoggleボタンのpanel切り替え
        if (panelImg) panelImg.src = isDark ? PANEL.dark : PANEL.light;
        // kv sliderのtoggleボタンのarrow切り替え
        if (arrowImg) arrowImg.src = isDark ? ARROW.dark : ARROW.light;

        themeButton.classList.toggle("is-dark", isDark);
        themeButton.setAttribute("aria-pressed", isDark);
        themeButton.setAttribute("aria-label", isDark ? "ライトモードに切り替え" : "ダークモードに切り替え");
    }

    updateTheme(themeStore.theme); // getter呼び出し。

    themeButton.addEventListener("click", () => {
        const currentTheme = themeStore.theme;
        const newTheme = currentTheme === themeStore.DARK ? themeStore.LIGHT : themeStore.DARK;
        updateTheme(newTheme);
    });
};
