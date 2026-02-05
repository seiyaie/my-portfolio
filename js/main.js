// main.js
import { initThemeSwitch } from "./component/theme-switch.js";
import { textSlider } from "./component/splide.js";
import { initSliderListToggle } from "./component/slider-list-toggle.js";
import { initHamburgerMenu } from "./component/hamburger-menu.js";
import { initKvSlider } from "./component/kv-slider.js";
import { initTitleReveal } from "./component/reveal-title.js";
import { initPagination } from "./component/pagination.js";

const pages = ["travel-gallery.html", "leaf-design-lab.html", "my-portfolio.html", "photographer.html", "coco.html", "matsuyama-clinic.html", "moshashugyo-media.html", "migliore.html"];

initThemeSwitch();
textSlider();
initSliderListToggle();
initHamburgerMenu();
initKvSlider();
initTitleReveal();
initPagination({
    pages,
    currentPage: Number(document.documentElement.dataset.page || 1),
    homeHref: "/works/",
});
