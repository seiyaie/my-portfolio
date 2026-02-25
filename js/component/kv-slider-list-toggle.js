// component/kv-slider-list-toggle.js
export const initKvSliderListToggle = () => {
    const toggleBtn = document.querySelector(".js-kv-slider-toggle");
    const toggleBtnArrow = document.querySelector(".js-kv-toggle-arrow");
    const slider = document.querySelector(".js-kv-slider-thumbnails");
    const sliderContainer = document.querySelector(".js-kv-slider-thumbnails-inner");

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
