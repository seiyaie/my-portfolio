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

const updateButtonState = (el, isDisabled) => {
    if (!el) return;

    el.classList.toggle("is-hidden", isDisabled);

    if (isDisabled) {
        el.setAttribute("aria-disabled", "true");
        el.removeAttribute("href");
        el.classList.add("is-disabled");
    } else {
        el.removeAttribute("aria-disabled");
        el.classList.remove("is-disabled");
    }
};

export const initPagination = ({ pages, currentPage } = {}) => {
    const nav = document.querySelector(".js-pagination-nav");
    if (!nav) return;

    if (!Array.isArray(pages) || pages.length === 0) return;

    const prevButton = nav.querySelector(".js-pagination-button--prev");
    const nextButton = nav.querySelector(".js-pagination-button--next");
    const list = nav.querySelector(".js-pagination-list");

    const prevTitleEl = nav.querySelector(".js-pagination-prev-title");
    const nextTitleEl = nav.querySelector(".js-pagination-next-title");

    if (!list) return;

    const totalPages = pages.length;
    const safeCurrent = Math.min(Math.max(Number(currentPage), 1), totalPages); // 1以上、totalPages以下の数値を代入

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

        // ...と現在のページは以外はリンクとして生成
        const a = document.createElement("a");
        a.className = "c-pagination-link";
        a.textContent = String(item);
        a.href = getHref(page);
        if (title) a.setAttribute("aria-label", `${item}ページ目：${title}`);

        li.appendChild(a);
        list.appendChild(li);
    });

    // prevボタン / nextボタンの処理
    const isPrevDisabled = safeCurrent <= 1;
    const isNextDisabled = safeCurrent >= totalPages;

    // prevButton, nextButtonの状態更新
    updateButtonState(prevButton, isPrevDisabled);
    updateButtonState(nextButton, isNextDisabled);

    const prevPage = !isPrevDisabled ? pages[safeCurrent - 2] : null; // 前のページを取得
    const nextPage = !isNextDisabled ? pages[safeCurrent] : null; // 次のページを取得

    if (prevButton && prevPage) prevButton.href = getHref(prevPage); // 前のページのhrefを指定
    if (nextButton && nextPage) nextButton.href = getHref(nextPage); // 次のページのhrefを指定

    // prev、nextボタン下に作品名を表示
    if (prevTitleEl) prevTitleEl.textContent = prevPage ? getTitle(prevPage) : "";
    if (nextTitleEl) nextTitleEl.textContent = nextPage ? getTitle(nextPage) : "";

    // prevButtonに対してaria-labelの指定
    if (prevButton) {
        if (prevPage) prevButton.setAttribute("aria-label", `前の作品：${getTitle(prevPage) || "前のページ"}`);
        else prevButton.removeAttribute("aria-label");
    }

    // nextButtonに対してaria-labelの指定
    if (nextButton) {
        if (nextPage) nextButton.setAttribute("aria-label", `次の作品：${getTitle(nextPage) || "次のページ"}`);
        else nextButton.removeAttribute("aria-label");
    }
};
