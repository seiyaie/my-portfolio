// component/reveal-title.js
gsap.registerPlugin(SplitText);

export const initTitleReveal = () => {
    const titles = document.querySelectorAll(".js-split");

    titles.forEach((title) => {
        const split = new SplitText(title, {
            type: "words,chars",
            wordsClass: "c-split-text-word",
            charsClass: "c-split-text-char",
        });

        const titleH = title.getBoundingClientRect().height;
        const yOffset = Math.ceil(titleH * 1.2);

        gsap.from(split.chars, {
            y: yOffset,
            duration: 0.5,
            ease: "power4.inOut",
            stagger: 0.06,
            scrollTrigger: {
                trigger: title,
                start: "top bottom",
                toggleActions: "play none none none",
                markers: true,
            },
        });
    });
};
