export const initSliderListToggle = () => {
    const toggleBtn = document.querySelector(".js-top-kv-toggle-button");
    const toggleBtnArrow = document.querySelector(".js-top-kv-button-arrow");
    const slider = document.querySelector(".js-top-kv-slider");
    const sliderContainer = document.querySelector(".js-top-kv-slider-list-container");

    if (!toggleBtn || !toggleBtnArrow || !slider || !sliderContainer) return;

    let isOpen = false;

    function calculateTranslate() {
        const containerWidth = sliderContainer.scrollWidth;
        const visibleWidth = slider.clientWidth;
        const hiddenWidth = containerWidth - visibleWidth;

        return hiddenWidth > 0 ? -hiddenWidth : 0;
    }

    toggleBtn.addEventListener("click", () => {
        if (isOpen) {
            gsap.to(sliderContainer, {
                x: 0,
                duration: 0.4,
                ease: "power2.inOut",
            });
            gsap.to(toggleBtnArrow, {
                rotate: 0,
                duration: 0.2,
            });
        } else {
            gsap.to(sliderContainer, {
                x: calculateTranslate(),
                duration: 0.4,
                ease: "power2.inOut",
            });
            gsap.to(toggleBtnArrow, {
                rotate: 180,
                duration: 0.2,
            });
        }
        isOpen = !isOpen;
    });
    window.addEventListener("resize", () => {
        if (isOpen) {
            const newX = calculateTranslate();

            gsap.set(sliderContainer, {
                x: newX,
            });
        }
    });
};
