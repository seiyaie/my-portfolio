export const initHamburgerMenu = () => {
  const hamburgerMenu = document.querySelector(".js-hamburger-menu");
  const openButton = document.querySelector(".js-hamburger-open-button");
  const closeButton = document.querySelector(".js-hamburger-close-button");

  openButton.addEventListener("click", () => {
    hamburgerMenu.showModal();
  });

  closeButton.addEventListener("click", () => {
    hamburgerMenu.close();
  })
};