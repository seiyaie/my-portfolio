// component/page-transition.js
export const initPageTransition = () => {
    const page = document.querySelector(".js-transition-root");
    if (!page) return;

    const D_ENTER = 0.7;
    const D_LEAVE = 0.6;

    const setIdle = () => gsap.set(page, { autoAlpha: 1 });

    const playEnter = () => {
        gsap.fromTo(page, { autoAlpha: 0 }, { autoAlpha: 1, duration: D_ENTER, ease: "power3.out" });
    };

    const playLeave = (href) => {
        gsap.to(page, {
            autoAlpha: 0,
            duration: D_LEAVE,
            ease: "power2.inOut",
            onComplete: () => (window.location.href = href),
        });
    };

    setIdle();
    playEnter();

    window.addEventListener("pageshow", (e) => {
        if (!e.persisted) return;
        setIdle();
        playEnter();
    });

    document.addEventListener("click", (e) => {
        const a = e.target.closest("a");
        if (!a) return;

        if (a.hasAttribute("download")) return;
        if (a.target && a.target !== "_self") return;

        const href = a.getAttribute("href");
        if (!href) return;
        if (href.startsWith("#")) return;
        if (href.startsWith("mailto:") || href.startsWith("tel:")) return;

        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.href === window.location.href) return;

        e.preventDefault();
        playLeave(url.href);
    });
};
