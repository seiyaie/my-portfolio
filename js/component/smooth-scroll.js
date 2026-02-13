// component/smooth-scroll.js

export const initSmoothScroll = () => {

  // headerの高さ取得
    const getScrollOffset = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 0;

    // ターゲットの位置取得
    const getTargetPosition = (target) => target.getBoundingClientRect().top + window.scrollY - getScrollOffset();

    // スクロールアニメーション
    const scrollToPosition = (position) => {
        gsap.to(window, {
            duration: 0.4,
            ease: "power3.inOut",
            scrollTo: position,
        });
    };


    // --------------------------
    // 同ページ内スクロール
    // --------------------------
    document.addEventListener("click", (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;

        const hash = link.hash;
        const target = document.querySelector(hash);

        // トップへ
        if (!hash || hash === "#") {
            e.preventDefault();
            scrollToPosition(0);
            return;
        }

        // アンカーへ
        if (target) {
            e.preventDefault();

            scrollToPosition(getTargetPosition(target));
            history.pushState(null, "", hash);
        }
    });

    // --------------------------
    // 他ページからのhash対応
    // --------------------------
    const urlHash = window.location.hash;
    if (urlHash) {
        const target = document.querySelector(urlHash);
        if (!target) return;

        history.replaceState(null, "", window.location.pathname);
        window.scrollTo(0, 0);

        window.addEventListener("load", () => {
            scrollToPosition(getTargetPosition(target));

            history.replaceState(null, "", window.location.pathname + urlHash);
        });
    }
};
