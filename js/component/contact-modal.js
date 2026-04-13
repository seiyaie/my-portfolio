// component/contact-modal.js
export const initContactModal = () => {
    const privacyModal = document.querySelector(".js-contact-modal--privacy");
    const privacyButton = document.querySelector(".js-contact-privacy-button");
    const privacyCloseButton = document.querySelector(".js-contact-privacy-close-button");
    const form = document.querySelector(".js-form");

    if (!privacyModal || !privacyButton || !privacyCloseButton || !form) return;

    let isAnimating = false;

    const content = privacyModal.querySelector(".js-contact-modal-content");
    const overlay = privacyModal.querySelector(".js-contact-modal-overlay");

    const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        onStart: () => {
            isAnimating = true;
        },
        onComplete: () => {
            isAnimating = false;
        },
        onReverseComplete: () => {
            isAnimating = false;
            privacyModal.close();
        },
    });

    // 開くアニメ（閉じはreverseで対応）
    tl.from(overlay, { opacity: 0, duration: 0.15 });
    if (content) {
        tl.from(content, { opacity: 0, scale: 0.8, duration: 0.3 }, "<");
    }

    const openPrivacy = () => {
        if (isAnimating || privacyModal.open) return;
        privacyModal.showModal();
        tl.play(0);
    };

    const closePrivacy = () => {
        if (isAnimating || !privacyModal.open) return;
        tl.reverse();
    };

    // open button
    privacyButton.addEventListener("click", openPrivacy);

    // close button
    privacyCloseButton.addEventListener("click", closePrivacy);

    // 背景clickで閉じる
    privacyModal.addEventListener("click", (e) => {
        if (!e.target.closest(".js-contact-modal-content")) {
            closePrivacy();
        }
    });

    // Escで閉じる
    privacyModal.addEventListener("cancel", (e) => {
        e.preventDefault();
        closePrivacy();
    });
};
