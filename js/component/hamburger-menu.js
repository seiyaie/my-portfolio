export const initHamburgerMenu = () => {
    const menu = document.querySelector(".js-hamburger-menu");
    const openButton = document.querySelector(".js-hamburger-open-button");
    const closeButton = document.querySelector(".js-hamburger-close-button");
    const links = document.querySelectorAll(".js-hamburger-menu-item--link a");

    openButton.addEventListener("click", () => {
        menu.showModal();
    });

    closeButton.addEventListener("click", () => {
        menu.close();
    });

    links.forEach((link) => {
        link.addEventListener("click", () => {
            const href = link.getAttribute("href");
            if (href.startsWith("#")) {
                menu.close();
            }
        });
    });
};
