// main.js
import { initThemeSwitch } from "./component/theme-switch.js";
import { textSlider } from "./component/splide.js";
import { initSliderListToggle } from "./component/slider-list-toggle.js";
import { initHamburgerMenu } from "./component/hamburger-menu.js";
import { initKvSlider } from "./component/kv-slider.js";
import { initTitleReveal } from "./component/reveal-title.js";
import { initPagination } from "./component/pagination.js";
import { WORKS_PAGES } from "./data/pages.js";
import { initSmoothScroll } from "./component/smooth-scroll.js";

const currentPage = Number(document.documentElement.dataset.page || 1);

initThemeSwitch();
textSlider();
initSliderListToggle();
initHamburgerMenu();
initKvSlider();
initTitleReveal();
initSmoothScroll();
initPagination({
    pages: WORKS_PAGES,
    currentPage,
});
