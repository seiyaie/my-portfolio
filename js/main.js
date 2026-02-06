// main.js
import { initThemeSwitch } from "./component/theme-switch.js";
import { textSlider } from "./component/splide.js";
import { initSliderListToggle } from "./component/slider-list-toggle.js";
import { initHamburgerMenu } from "./component/hamburger-menu.js";
import { initKvSlider } from "./component/kv-slider.js";
import { initTitleReveal } from "./component/reveal-title.js";
import { initPagination } from "./component/pagination.js";

const pages = [
    { href: "travel-gallery.html", title: "travel gallery" },
    { href: "leaf-design-lab.html", title: "leaf-design-lab" },
    { href: "my-portfolio.html", title: "my-portfolio" },
    { href: "photographer.html", title: "photographer" },
    { href: "coco.html", title: "coco" },
    { href: "matsuyama-clinic.html", title: "matsuyama-clinic" },
    { href: "moshashugyo-media.html", title: "moshashugyo-media" },
    { href: "migliore.html", title: "migliore" },
];

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
