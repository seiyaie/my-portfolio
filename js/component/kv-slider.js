export const initKvSlider = () => {
    const selectedWork = document.querySelector(".js-top-kv-selected-work img");
    const sliderItems = document.querySelectorAll(".js-kv-slider-item-trigger");
    const nextButton = document.querySelector(".js-kv-scroll-button--next");
    const prevButton = document.querySelector(".js-kv-scroll-button--prev");
    const thumb = document.querySelector(".js-scrollbar-thumb");
    const indexText = document.querySelector(".js-scrollbar-index");

    if (!selectedWork || !sliderItems.length || !nextButton || !prevButton || !thumb || !indexText) return;

    const total = sliderItems.length;
    let activeIndex = 0;
    let isAnimating = false;

    const updateSelectedWork = (index, direction) => {
        if (isAnimating) return;
        isAnimating = true;
        setActive(index);
        const item = sliderItems[index];

        const clone = selectedWork.cloneNode(true);
        clone.style.position = "absolute";
        clone.style.inset = 0;
        selectedWork.parentNode.appendChild(clone);

        selectedWork.src = item.dataset.mainSrc;
        selectedWork.srcset = item.dataset.mainSrcset;
        selectedWork.sizes = item.dataset.mainSizes;

        const fromX = direction === "next" ? "100%" : "-100%";
        const toX = direction === "next" ? "-100%" : "100%";

        const percentage = (100 / total) * index;
        indexText.textContent = `${index + 1} / ${total}`;

        gsap.set(selectedWork, { x: fromX, opacity: 1, position: "absolute", inset: 0 });

        const tl = gsap.timeline({
            onComplete: () => {
                clone.remove();
                gsap.set(selectedWork, { clearProps: "all" });
                isAnimating = false;
            },
        });
        tl.call(
            () => {
                scrollActiveItem(item);
            },
            null,
            0
        )
            .to(
                thumb,
                {
                    left: `${percentage}%`,
                    duration: 0.6,
                    ease: "power2.inOut",
                },
                0
            )
            .to(
                clone,
                {
                    x: toX,
                    duration: 0.6,
                    ease: "power2.inOut",
                },
                0
            )
            .to(
                selectedWork,
                {
                    x: "0%",
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.inOut",
                },
                0
            );
    };

    const scrollActiveItem = (item) => {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        if (!isMobile) return;

        item.closest(".top-kv-slider-item")?.scrollIntoView({
            behavior: "smooth",
            inline: "nearest",
            block: "nearest",
        });
    };

    const setActive = (newIndex) => {
        sliderItems[activeIndex].classList.remove("is-active");
        sliderItems[newIndex].classList.add("is-active");
        activeIndex = newIndex;
    };

    sliderItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            if (isAnimating || activeIndex === index) return;
            const direction = index > activeIndex ? "next" : "prev";
            updateSelectedWork(index, direction);
        });
    });

    nextButton.addEventListener("click", () => {
        if (isAnimating) return;
        const nextIndex = (activeIndex + 1) % total;
        updateSelectedWork(nextIndex, "next");
    });

    prevButton.addEventListener("click", () => {
        if (isAnimating) return;
        const prevIndex = (activeIndex - 1 + total) % total;
        updateSelectedWork(prevIndex, "prev");
    });
};
