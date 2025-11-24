export const initHamburgerMenu = () => {
    const menu = document.querySelector(".js-hamburger-menu");
    const openButton = document.querySelector(".js-hamburger-open-button");
    const closeButton = document.querySelector(".js-hamburger-close-button");
    const links = document.querySelectorAll(".js-hamburger-menu-item--link a");

    if (!menu || !openButton || !closeButton || links.length === 0) return;

    // 状態管理
    let isAnimating = false;

    // GSAP timeline
    const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        onStart: () => {
            isAnimating = true;
        },
        onComplete: () => {
            isAnimating = false;
        },
        onReverseComplete: () => {
            isAnimating = false;
            menu.close();
        },
    });

    tl.from(menu, { opacity: 0, duration: 0.3 }).from(".js-hamburger-menu-list", { opacity: 0, y: 24, duration: 0.3 });

    // メニュー開く関数
    const openMenu = () => {
        if (isAnimating || menu.open) return;
        menu.showModal();
        tl.play(0);
    };

    // メニュー閉じる関数
    const closeMenu = () => {
        if (isAnimating || !menu.open) return;
        tl.reverse();
    };

    openButton.addEventListener("click", openMenu);
    closeButton.addEventListener("click", closeMenu);

    // escキーで閉じる
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (!menu.open) return;
            e.preventDefault();
            closeMenu();
        }
    });

    // 背景クリックで閉じる
    menu.addEventListener("click", (e) => {
        if (!e.target.closest(".js-hamburger-menu-item")) {
            closeMenu();
        }
    });

    // 同一ページ内のリンクをクリックしたらメニューを閉じる
    links.forEach((link) => {
        link.addEventListener("click", () => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
                menu.close();
            }
        });
    });
};
