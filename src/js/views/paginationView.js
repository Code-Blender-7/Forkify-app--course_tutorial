import View from "./view";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline"); // event delegation
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const current_Page = this._data.page;
    // GET number of pages.

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // if on Page 1 and other pages are present;
    if (current_Page === 1 && numPages > 1) {
      return this._generateMarkup_NextButton(current_Page);
    }

    // if on last page
    if (current_Page === numPages && numPages > 1)
      return this._generateMarkup_PrevButton(current_Page);

    // other pages
    if (current_Page < numPages) {
      return [
        this._generateMarkup_NextButton(current_Page),
        this._generateMarkup_PrevButton(current_Page),
      ];
    }

    // Page 1 and no other pages are available
    return;
  }

  _generateMarkup_NextButton(currentPage) {
    return `
    <button data-goto=${
      currentPage + 1
    } class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}.svg#icon-arrow-right"></use>
        </svg>
    </button>
    `;
  }

  _generateMarkup_PrevButton(currentPage) {
    return `
    <button data-goto=${
      currentPage - 1
    } class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
        <span>Page ${currentPage - 1}</span>
    </button>
    `;
  }
}

export default new PaginationView();
