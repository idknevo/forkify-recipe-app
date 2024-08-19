import View from "./view.js";
import icons from "url:../../img/icons.svg";

class paginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateHtml() {
    const currentPage = this._data.page;
    const numOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1 && there are other pages
    if (currentPage === 1 && numOfPages > 1) {
      return this._generateNextButtonHtml(currentPage);
    }

    // last page
    if (currentPage === numOfPages && numOfPages > 1) {
      return this._generatePreviousButtonHtml(currentPage);
    }

    // other pages
    if (currentPage < numOfPages) {
      return this._generateBothButtonsHtml(currentPage);
    }

    // only one page
    return "";
  }

  _generateNextButtonHtml(curPage) {
    return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
  }

  _generatePreviousButtonHtml(curPage) {
    return `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
    </button>
  `;
  }

  _generateBothButtonsHtml(curPage) {
    return [
      this._generatePreviousButtonHtml(curPage),
      this._generateNextButtonHtml(curPage),
    ].join("");
  }
}

export default new paginationView();
