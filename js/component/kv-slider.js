export const initKvSlider = () => {
    const selectedLink = document.querySelector(".js-kv-slider-link");
    const selectedImg = selectedLink?.querySelector("img");
    const sliderItems = document.querySelectorAll(".js-kv-slider-item-trigger");
    const ctaButton = document.querySelector(".js-kv-slider-cta-button a");
    const nextButton = document.querySelector(".js-kv-slider-nav-button--next");
    const prevButton = document.querySelector(".js-kv-slider-nav-button--prev");
    const thumb = document.querySelector(".js-kv-slider-progress-bar-thumb");
    const indexText = document.querySelector(".js-kv-slider-progress-index");

    if (!selectedLink || !selectedImg || !sliderItems.length || !ctaButton || !nextButton || !prevButton || !thumb || !indexText) return;

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

        if (item.dataset.href) {
            selectedLink.href = item.dataset.href;
            ctaButton.href = item.dataset.href;
        }

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

        const target = item.closest(".js-kv-slider-item");
        const container = target.parentElement;

        const rect = target.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const offset = 80;

        const scrollLeft = container.scrollLeft + (rect.left - containerRect.left) - offset;

        container.scrollTo({
            left: scrollLeft,
            behavior: "smooth",
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
