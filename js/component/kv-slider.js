export const initKvSlider = () => {
    const selectedWork = document.querySelector(".js-top-kv-selected-work img");
    const sliderItems = document.querySelectorAll(".js-kv-slider-item--trigger");
    const nextButton = document.querySelector(".js-kv-scroll-button--next");
    const prevButton = document.querySelector(".js-kv-scroll-button--prev");
    const thumb = document.querySelector(".js-scrollbar-thumb");
    const indexText = document.querySelector(".js-scrollbar-index");

    const total = sliderItems.length;
    let activeIndex = 0;

    const updateSelectedWork = (index) => {
        activeIndex = index;
        const item = sliderItems[index];

        selectedWork.src = item.dataset.mainSrc;
        selectedWork.srcset = item.dataset.mainSrcset;
        selectedWork.sizes = item.dataset.mainSizes;

        const percentage = (100 / total) * index;
        thumb.style.left = `${percentage}%`;

        indexText.textContent = `${index + 1} / ${total}`;
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
