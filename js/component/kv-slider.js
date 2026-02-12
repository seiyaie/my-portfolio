export const initKvSlider = () => {
    const selectedLink = document.querySelector(".js-top-kv-selected-link");
    const selectedImg = selectedLink?.querySelector("img");
    const sliderItems = document.querySelectorAll(".js-kv-slider-item-trigger");
    const nextButton = document.querySelector(".js-kv-scroll-button--next");
    const prevButton = document.querySelector(".js-kv-scroll-button--prev");
    const thumb = document.querySelector(".js-scrollbar-thumb");
    const indexText = document.querySelector(".js-scrollbar-index");

    if (!selectedLink || !selectedImg || !sliderItems.length || !nextButton || !prevButton || !thumb || !indexText) return;

    const total = sliderItems.length;
    let activeIndex = 0;
    let isAnimating = false;

    const updateSelectedLink = (index, direction) => {
        if (isAnimating) return;
        isAnimating = true;
        setActive(index);
        const item = sliderItems[index];

        const clone = selectedLink.cloneNode(true);
        clone.style.position = "absolute";
        clone.style.inset = 0;
        selectedLink.parentNode.appendChild(clone);

        selectedImg.src = item.dataset.mainSrc;
        selectedImg.srcset = item.dataset.mainSrcset;
        selectedImg.sizes = item.dataset.mainSizes;

        if (item.dataset.href) selectedLink.href = item.dataset.href;

        const fromX = direction === "next" ? "100%" : "-100%";
        const toX = direction === "next" ? "-100%" : "100%";

        const percentage = (100 / total) * index;
        indexText.textContent = `${index + 1} / ${total}`;

        gsap.set(selectedLink, { x: fromX, opacity: 1, position: "absolute", inset: 0 });

        const tl = gsap.timeline({
            onComplete: () => {
                clone.remove();
                gsap.set(selectedLink, { clearProps: "all" });
                isAnimating = false;
            },
        });
        tl.call(() => {
            scrollActiveItem(item);
        }, 0)
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
                selectedLink,
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

        item.closest(".js-top-kv-slider-item")?.scrollIntoView({
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
            updateSelectedLink(index, direction);
        });
    });

    nextButton.addEventListener("click", () => {
        if (isAnimating) return;
        const nextIndex = (activeIndex + 1) % total;
        updateSelectedLink(nextIndex, "next");
    });

    prevButton.addEventListener("click", () => {
        if (isAnimating) return;
        const prevIndex = (activeIndex - 1 + total) % total;
        updateSelectedLink(prevIndex, "prev");
    });
};
