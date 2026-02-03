export const initThemeSwitch = () => {
    // DOM取得
    const themeButtons = document.querySelectorAll(".js-theme-button");
    const themeIcons = document.querySelectorAll(".js-theme-icon");
    const logoImg = document.querySelector(".js-theme-logo");
    const arrowImg = document.querySelector(".js-theme-arrow");
    const hamburgerOpenImg = document.querySelector(".js-theme-hamburger-open");
    const hamburgerCloseImg = document.querySelector(".js-theme-hamburger-close");
    const xIconImgs = document.querySelectorAll(".js-theme-x");
    const gitHubIconImgs = document.querySelectorAll(".js-theme-github");

    // 画像パス
    const ICON = {
        light: "/img/icons/system/light-mode.svg",
        dark: "/img/icons/system/dark-mode.svg",
    };

    const LOGO = {
        light: "/img/logo/logo-black.svg",
        dark: "/img/logo/logo-white.svg",
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
    const X_ICON = {
        light: "/img/icons/sns/x-black.svg",
        dark: "/img/icons/sns/x-white.svg",
    };
    const GITHUB_ICON = {
        light: "/img/icons/sns/github-black.svg",
        dark: "/img/icons/sns/github-white.svg",
    };

    const ASSETS = {
        logo: LOGO,
        arrow: ARROW,
        hamburgerOpen: HAMBURGER_OPEN,
        hamburgerClose: HAMBURGER_CLOSE,
        x: X_ICON,
        github: GITHUB_ICON,
    };

    const ASSET_TARGETS = {
        logo: logoImg,
        arrow: arrowImg,
        hamburgerOpen: hamburgerOpenImg,
        hamburgerClose: hamburgerCloseImg,
        x: xIconImgs,
        github: gitHubIconImgs,
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

    const setSrc = (target, src) => {
        if (!target) return;
        if (target instanceof NodeList || Array.isArray(target)) {
            target.forEach((el) => {
                if (el) el.src = src;
            });
            return;
        }
        target.src = src;
    };

    function updateTheme(theme) {
        themeStore.theme = theme; // setter呼び出し。updateThemeに渡されたthemeがsetterのvalueに入る。
        const isDark = theme === themeStore.DARK;

        // テーマ切り替えボタンのアイコンを更新
        themeIcons.forEach((icon) => {
            icon.src = isDark ? ICON.light : ICON.dark;
        });

        // ASSETS + TARGETS をループで反映
        Object.keys(ASSETS).forEach((key) => {
            const paths = ASSETS[key]; // { light, dark }
            const target = ASSET_TARGETS[key]; // img or NodeList
            const nextSrc = isDark ? paths.dark : paths.light;
            setSrc(target, nextSrc);
        });

        // テーマ切り替えボタンの状態（aria とクラス）更新
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
