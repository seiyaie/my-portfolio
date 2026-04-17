// component/hamburger-menu.js
export const initHamburgerMenu = () => {
    const menu = document.querySelector(".js-hamburger-menu");
    const openButton = document.querySelector(".js-hamburger-open-button");
    const closeButton = document.querySelector(".js-hamburger-close-button");
    const links = document.querySelectorAll(".js-hamburger-menu-item--link a");

    if (!menu || !openButton || !closeButton || links.length === 0) return;

    const FROM_HAMBURGER_KEY = "nav_from_hamburger";
    const HAMBURGER_HASH_KEY = "nav_hash_after_hamburger";

    let isAnimating = false;

    const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        onStart: () => (isAnimating = true),
        onComplete: () => (isAnimating = false),
    });

    tl.from(menu, { opacity: 0, duration: 0.3 }).from(".js-hamburger-menu-list", { opacity: 0, y: 24, duration: 0.3 });

    const disableScroll = () => {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
    };

    const enableScroll = () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
    };

    const openMenu = () => {
        if (isAnimating || menu.open) return;
        disableScroll();
        menu.showModal();
        tl.play(0);
    };

    const closeMenu = () => {
        if (isAnimating || !menu.open) return Promise.resolve();

        return new Promise((resolve) => {
            tl.eventCallback("onReverseComplete", () => {
                menu.close();
                enableScroll();
                resolve();
                tl.eventCallback("onReverseComplete", null);
            });
            tl.reverse();
        });
    };

    const isSamePage = (url) => url.pathname === window.location.pathname && url.search === window.location.search;

    const scrollToHash = (hash) => {
        if (!hash) return;

        // smooth scroll実行
        if (window.__scrollToHash) {
            window.__scrollToHash(hash);
            return;
        }

        // 保険
        history.pushState(null, "", hash);
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const setHamburgerNavFlag = (hash) => {
        sessionStorage.setItem(FROM_HAMBURGER_KEY, "1");
        if (hash) sessionStorage.setItem(HAMBURGER_HASH_KEY, hash);
        else sessionStorage.removeItem(HAMBURGER_HASH_KEY);
    };

    // --------------------------
    // button / close triggers
    // --------------------------
    openButton.addEventListener("click", openMenu);
    closeButton.addEventListener("click", closeMenu);

    // escでメニュー閉じる
    menu.addEventListener("cancel", (e) => {
        e.preventDefault();
        closeMenu();
    });

    // 背景クリックでメニュー閉じる
    menu.addEventListener("click", (e) => {
        if (!e.target.closest(".js-hamburger-menu-item")) closeMenu();
    });

    // arrived from hamburger
    const fromHamburger = sessionStorage.getItem(FROM_HAMBURGER_KEY) === "1";
    if (fromHamburger) {
        sessionStorage.removeItem(FROM_HAMBURGER_KEY);

        const pendingHash = sessionStorage.getItem(HAMBURGER_HASH_KEY);
        sessionStorage.removeItem(HAMBURGER_HASH_KEY);

        // 「開いた状態」を一瞬で作ってから、次フレームで閉じる
        menu.showModal();
        tl.progress(1);

        requestAnimationFrame(async () => {
            await closeMenu();
            scrollToHash(pendingHash);
        });
    }

    // --------------------------
    // link handling
    // --------------------------
    links.forEach((link) => {
        link.addEventListener("click", async (e) => {
            const href = link.getAttribute("href");
            if (!href) return;

            e.preventDefault();
            e.stopPropagation();

            const url = new URL(href, window.location.href);

            // 外部は普通に遷移
            if (url.origin !== window.location.origin) {
                window.location.href = href;
                return;
            }

            // hashあり
            if (url.hash) {
                // 同一ページhash
                if (isSamePage(url)) {
                    await closeMenu();
                    scrollToHash(url.hash);
                    return;
                }

                // 別ページ + hash
                setHamburgerNavFlag(url.hash);
                window.location.href = url.origin + url.pathname + url.search;
                return;
            }

            // hashなし内部リンク
            setHamburgerNavFlag();
            window.location.href = url.href;
        });
    });
};
