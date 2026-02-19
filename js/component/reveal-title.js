gsap.registerPlugin(SplitText);

export const initTitleReveal = () => {
    const titles = document.querySelectorAll(".js-split");

    titles.forEach((title) => {
        const split = new SplitText(title, {
            type: "chars",
        });

        gsap.from(split.chars, {
            yPercent: 150,
            stagger: 0.1,
            duration: 1,
            ease: "power4.inOut",
            onComplete: () => {
                split.revert();
            },
            scrollTrigger: {
                trigger: title,
                start: "top 95%",
                toggleActions: "play none none none",
            },
        });
    });
};
