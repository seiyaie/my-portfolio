export const initKvSlider = () => {
    const selectedWork = document.querySelector(".js-top-kv-selected-work img");
    const sliderItems = document.querySelectorAll(".js-kv-slider-item--trigger");
    const nextButton = document.querySelector(".js-kv-scroll-button--next");
    const prevButton = document.querySelector(".js-kv-scroll-button--prev");
    const thumb = document.querySelector(".js-scrollbar-thumb");
    const indexText = document.querySelector(".js-scrollbar-index");

    const total = sliderItems.length;
    let activeIndex = 0;
    let isAnimating = false;

    const updateSelectedWork = (index, direction) => {
        if (isAnimating) return;
        isAnimating = true;
        activeIndex = index;
        const item = sliderItems[index];

        sliderItems.forEach((item) => {
            item.classList.remove("is-active");
        });
        item.classList.add("is-active");

        const clone = selectedWork.cloneNode(true);
        clone.style.position = "absolute";
        clone.style.inset = 0;
        // clone.style.width = "100%";
        // clone.style.height = "100%";
        // clone.style.zIndex = 2;
        selectedWork.parentNode.appendChild(clone);

        selectedWork.src = item.dataset.mainSrc;
        selectedWork.srcset = item.dataset.mainSrcset;
        selectedWork.sizes = item.dataset.mainSizes;

        const fromX = direction === "next" ? "100%" : "-100%";
        const toX = direction === "next" ? "-100%" : "100%";
        // selectedWork.style.opacity = 0;
        // selectedWork.style.transform = `translateX(${direction === "next" ? "100%" : "-100%"})`;

        const percentage = (100 / total) * index;
        // thumb.style.left = `${percentage}%`;
        indexText.textContent = `${index + 1} / ${total}`;

        gsap.set(selectedWork, { x: fromX, opacity: 1, position: "absolute", inset: 0 });

        const tl = gsap.timeline({
            onComplete: () => {
                clone.remove();
                gsap.set(selectedWork, { clearProps: "all" });
                isAnimating = false;
            },
        });
        tl.to(thumb, {
            left: `${percentage}%`,
            duration: 0.6,
            ease: "power2.inOut",
        },0)
            .to(clone, {
                x: toX,
                duration: 0.6,
                ease: "power2.inOut",
            },0)
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

    sliderItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            activeIndex = index;
            updateSelectedWork(activeIndex);
        });
    });

    nextButton.addEventListener("click", () => {
        // activeIndex++;
        // if (activeIndex >= sliderItems.length) {
        //     activeIndex = 0;
        // }
        // updateSelectedWork(activeIndex);
        const nextIndex = (activeIndex + 1) % total;
        updateSelectedWork(nextIndex, "next");
        activeIndex = nextIndex;
    });

    prevButton.addEventListener("click", () => {
        // activeIndex--;
        // if (activeIndex < 0) {
        //     activeIndex = sliderItems.length - 1;
        // }
        // updateSelectedWork(activeIndex);
        const prevIndex = (activeIndex - 1 + total) % total;
        updateSelectedWork(prevIndex, "prev");
        activeIndex = prevIndex;
    });
};
