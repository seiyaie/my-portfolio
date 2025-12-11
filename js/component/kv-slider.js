export const initKvSlider = () => {
    const selectedWork = document.querySelector(".js-top-kv-selected-work img");
    const sliderItems = document.querySelectorAll(".js-kv-slider-item--trigger");
    const nextButton = document.querySelector(".js-kv-scroll-button--next");
    const prevButton = document.querySelector(".js-kv-scroll-button--prev");

    let activeIndex = 0;

    const updateSelectedWork = (index) => {
        const item = sliderItems[index];

        const mainSrc = item.dataset.mainSrc;
        const mainSrcset = item.dataset.mainSrcset;
        const mainSizes = item.dataset.mainSizes;

        selectedWork.src = mainSrc;
        selectedWork.srcset = mainSrcset;
        selectedWork.sizes = mainSizes;
    };

    sliderItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            activeIndex = index;
            updateSelectedWork(activeIndex);
        });
    });

    nextButton.addEventListener("click", () => {
        activeIndex++;
        if (activeIndex >= sliderItems.length) {
            activeIndex = 0;
        }
        updateSelectedWork(activeIndex);
    });

    prevButton.addEventListener("click", () => {
        activeIndex--;
        if (activeIndex < 0) {
            activeIndex = sliderItems.length - 1;
        }
        updateSelectedWork(activeIndex);
    });
};
