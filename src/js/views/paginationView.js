import View from "./view";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    // GET number of pages.
    const current_Page = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    // if on Page 1 and other pages are present;
    if (current_Page === 1 && numPages > 1)
      return `
        <button class="btn--inline pagination__btn--next">
            <span>Page ${current_Page + 1}</span>
            <svg class="search__icon">
                <use href="${icons}.svg#icon-arrow-right"></use>
            </svg>
        </button>
        `;

    // if on last page
    if (current_Page === numPages && numPages > 1)
      return `
        <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${current_Page - 1}</span>
        </button>
        `;

    // other pages
    if (current_Page < numPages)
      return `
        <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${current_Page - 1}</span>
        </button>

        <button class="btn--inline pagination__btn--next">
            <span>Page ${current_Page + 1}</span>
            <svg class="search__icon">
                <use href="${icons}.svg#icon-arrow-right"></use>
            </svg>
        </button>
        `;

    // Page 1 and no other pages are available
    return;
  }
}

export default new PaginationView();
