// component/contact-modal.js
export const initContactModal = () => {
    const privacyModal = document.querySelector(".js-contact-modal--privacy");
    const successModal = document.querySelector(".js-contact-modal--success");
    const privacyButton = document.querySelector(".js-contact-privacy-button");
    const form = document.querySelector(".js-form");
    const privacyCloseButton = document.querySelector(".js-contact-privacy-close-button");
    const successCloseButton = document.querySelector(".js-contact-success-close-button");

    if (!privacyModal || !privacyButton || !privacyCloseButton || !successModal || !successCloseButton || !form) return;

    // アニメ共通（dialogを引数で受け取る）
    let isAnimating = false;

    // dialogごとにtimelineを持たせる
    const timelines = new WeakMap();

    const getTimeline = (modal) => {
        // もしすでにtimelineを持っていたらそれを返す
        if (timelines.has(modal)) return timelines.get(modal);

        const content = modal.querySelector(".js-contact-modal-content");
        const overlay = modal.querySelector(".js-contact-modal-overlay");
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
                modal.close();
            },
        });

        tl.from(overlay, { opacity: 0, duration: 0.15 });

        if (content) {
            tl.from(content, { opacity: 0, scale: 0.8, duration: 0.3 }, "<");
        }

        timelines.set(modal, tl);
        return tl;
    };

    const openModal = (modal) => {
        if (!modal || isAnimating || modal.open) return;
        modal.showModal();
        getTimeline(modal).play(0);
    };

    const closeModal = (modal) => {
        if (!modal || isAnimating || !modal.open) return;
        getTimeline(modal).reverse();
    };

    // =============================
    // プライバシーポリシーモーダル
    // =============================
    privacyButton.addEventListener("click", () => {
        openModal(privacyModal);
    });

    // なぜprivacyCloseButtonはoptional chaining?
    privacyCloseButton.addEventListener("click", () => {
        closeModal(privacyModal);
    });

    // 背景クリックで閉じる（dialog内のcontent以外）
    privacyModal.addEventListener("click", (e) => {
        if (!e.target.closest(".js-contact-modal-content")) {
            closeModal(privacyModal);
        }
    });

    // =============================
    // success（送信完了モーダル）
    // =============================
    successCloseButton.addEventListener("click", () => {
        closeModal(successModal);
    });

    successModal.addEventListener("click", (e) => {
        if (!e.target.closest(".js-contact-modal-content")) {
            closeModal(successModal);
        }
    });

    // Escで閉じる（dialog標準でも閉じるが、アニメで閉じたいので上書き）
    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;

        // 開いてる方だけ閉じる（両方開くことは基本ない想定）
        if (privacyModal.open) {
            e.preventDefault();
            closeModal(privacyModal);
        } else if (successModal.open) {
            e.preventDefault();
            closeModal(successModal);
        }
    });

    // 外部から success を開けるようにする（submit成功後に呼ぶ）
    return {
        openSuccess: () => openModal(successModal),
        closeSuccess: () => closeModal(successModal),
    };
};
