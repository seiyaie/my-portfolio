// main.js

import { initPageTransition } from "./component/page-transition.js";
import { initThemeSwitch } from "./component/theme-switch.js";
import { initTextSlider } from "./component/text-slider.js";
import { initSliderListToggle } from "./component/slider-list-toggle.js";
import { initHamburgerMenu } from "./component/hamburger-menu.js";
import { initKvSlider } from "./component/kv-slider.js";
import { initTitleReveal } from "./component/reveal-title.js";
import { initPagination } from "./component/pagination.js";
import { WORKS_PAGES } from "./data/pages.js";
import { initSmoothScroll } from "./component/smooth-scroll.js";
import { initFormValidation } from "./component/form-validation.js";
import { initContactModal } from "./component/contact-modal.js";

const currentPage = Number(document.documentElement.dataset.page || 1);

initPageTransition();
initThemeSwitch();
initTextSlider();
initSliderListToggle();
initHamburgerMenu();
initKvSlider();
initTitleReveal();
initSmoothScroll();
initFormValidation();
initContactModal();
initPagination({
    pages: WORKS_PAGES,
    currentPage,
});
