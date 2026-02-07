// component/pagination.js

const getHref = (page) => (typeof page === "string" ? page : page?.href);
const getTitle = (page) => (typeof page === "string" ? "" : page?.title ?? "");

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

export const initPagination = ({ pages, currentPage } = {}) => {
    const nav = document.querySelector(".c-pagination-nav");
    if (!nav) return;

    if (!Array.isArray(pages) || pages.length === 0) return;

    const prevLink = nav.querySelector(".js-pagination-button--prev");
    const nextLink = nav.querySelector(".js-pagination-button--next");
    const list = nav.querySelector(".js-pagination-list");

    const prevTitleEl = nav.querySelector(".js-pagination-prev-title");
    const nextTitleEl = nav.querySelector(".js-pagination-next-title");

    if (!list) return;

    const totalPages = pages.length;
    const safeCurrent = Math.min(Math.max(Number(currentPage), 1), totalPages);

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

        const page = pages[item - 1];
        const title = getTitle(page);

        // 現在のページはspanにして、リンクにしない
        if (item === safeCurrent) {
            li.classList.add("is-active");

            const span = document.createElement("span");
            span.className = "c-pagination-link";
            span.textContent = String(item);
            span.setAttribute("aria-current", "page");
            if (title) span.setAttribute("aria-label", `${item}ページ目：${title}`);

            li.appendChild(span);
            list.appendChild(li);
            return;
        }

        // 他ページはリンク
        const a = document.createElement("a");
        a.className = "c-pagination-link";
        a.textContent = String(item);
        a.href = getHref(page);
        if (title) a.setAttribute("aria-label", `${item}ページ目：${title}`);
        a.setAttribute("aria-current", "page");

        li.appendChild(a);
        list.appendChild(li);
    });

    // prev / next
    const prevDisabled = safeCurrent <= 1;
    const nextDisabled = safeCurrent >= totalPages;

    setDisabled(prevLink, prevDisabled, { hide: true });
    setDisabled(nextLink, nextDisabled, { hide: true });

    const prevPage = !prevDisabled ? pages[safeCurrent - 2] : null;
    const nextPage = !nextDisabled ? pages[safeCurrent] : null;

    if (prevLink && prevPage) prevLink.href = getHref(prevPage);
    if (nextLink && nextPage) nextLink.href = getHref(nextPage);

    // ボタン下に作品名を表示
    if (prevTitleEl) prevTitleEl.textContent = prevPage ? getTitle(prevPage) : "";
    if (nextTitleEl) nextTitleEl.textContent = nextPage ? getTitle(nextPage) : "";

    if (prevLink) {
        if (prevPage) prevLink.setAttribute("aria-label", `前の作品：${getTitle(prevPage) || "前のページ"}`);
        else prevLink.removeAttribute("aria-label");
    }
    if (nextLink) {
        if (nextPage) nextLink.setAttribute("aria-label", `次の作品：${getTitle(nextPage) || "次のページ"}`);
        else nextLink.removeAttribute("aria-label");
    }
};
