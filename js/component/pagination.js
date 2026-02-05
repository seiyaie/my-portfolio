// component/pagination.js

const generatePageNumbers = (totalPages, currentPage) => {
  const pagination = [];
  let pageNo = 1;

  while (pageNo <= totalPages) {
    const isFirst = pageNo === 1;
    const isLast = pageNo === totalPages;
    const isMiddle = pageNo >= currentPage - 1 && pageNo <= currentPage + 1;

    if (isFirst || isLast || isMiddle) {
      pagination.push(pageNo);
      pageNo++;
    } else {
      pagination.push("...");
      pageNo = pageNo < currentPage ? currentPage - 1 : totalPages;
    }
  }
  return pagination;
};

const setDisabled = (el, disabled, { hide = false } = {}) => {
  if (!el) return;

  if (hide) el.classList.toggle("is-hidden", disabled);

  if (disabled) {
    el.setAttribute("aria-disabled", "true");
    el.removeAttribute("href");
    el.classList.add("is-disabled");
  } else {
    el.removeAttribute("aria-disabled");
    el.classList.remove("is-disabled");
  }
};

export const initPagination = ({
  pages,
  currentPage,
  homeHref = "works.html",
} = {}) => {
  const nav = document.querySelector(".c-pagination-nav");
  if (!nav) return;

  if (!Array.isArray(pages) || pages.length === 0) return;

  const prevLink = nav.querySelector(".js-pagination-button--prev");
  const nextLink = nav.querySelector(".js-pagination-button--next");
  const homeLink = nav.querySelector(".js-pagination-button--home");
  const list = nav.querySelector(".js-pagination-list");


  if (!list || !homeLink) return;

  const totalPages = pages.length;
  const safeCurrent = Math.min(Math.max(Number(currentPage), 1), totalPages);

  // home
  if (homeLink) homeLink.href = homeHref;

  list.innerHTML = "";

  const items = generatePageNumbers(totalPages, safeCurrent);

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "c-pagination-item";

    if (item === "...") {
      li.innerHTML = `<span class="c-pagination-link c-pagination-link--dots" aria-hidden="true">...</span>`;
      list.appendChild(li);
      return;
    }

    const a = document.createElement("a");
    a.className = "c-pagination-link";
    a.textContent = String(item);
    a.href = pages[item - 1];

    if (item === safeCurrent) {
      li.classList.add("is-active");
      a.setAttribute("aria-current", "page");
    }

    li.appendChild(a);
    list.appendChild(li);
  });

  // prev / next
  const prevDisabled = safeCurrent <= 1;
  const nextDisabled = safeCurrent >= totalPages;

  setDisabled(prevLink, prevDisabled, { hide: true });
  setDisabled(nextLink, nextDisabled, { hide: true });

  if (!prevDisabled) prevLink.href = pages[safeCurrent - 2];
  if (!nextDisabled) nextLink.href = pages[safeCurrent];
};