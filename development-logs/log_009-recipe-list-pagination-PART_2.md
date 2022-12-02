_This is the second part of the Recipe list pagination feature_

# START

In the first part, you understood and learned about how to separate the list from one page to the second page.

More like the first part is all math and enchancements but thanks to that, the code of the second phase of integrating the page pagination is about to be much easier.


These are the todos for creating the recipe page pagination successfully.

1. Find out which page the user is. Find out if it is the first or the last page. Find out if it is some other page.
> it is neccessary because each pages would have different results or should I say, different markups.

2. Display the recipe list based on the user click action to change the pages.

For the first part, we be creating a new file called the paginationView.js that is used for handling the core aspects of the pagination feature. It will be exported to the controller.js and this file contains a object called paginationView that extends to the view object of the View.js

The first thing to do is another calculation. 
First to find the number of page number that are currently present based on the search results.

Suppose that the total list length is 59. That is if you divide it by 10 as the results per page becomes 5.9 which is not a page number. So? We will fix it to 6. 

This is the code for it.
__this._data is imported from view.js assuring that the code has passed the values of model.state from the model to the controller.js__
```
const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
```
And hence,

```
  _generateMarkup() {
    // GET number of pages.
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    // if on Page 1;
    if (this._data.page === 1 && numPages > 1) return "page 1, others";

    // if on last page
    if (this._data.page === numPages && numPages > 1) return "Last page.";

    // other pages
    if (this._data.page < numPages) return "Other page";

    // Page 1 and no other pages
    return "only 1 page is present";
  }
```

be sure to add markups on every scenarios.

Funny for jonas (_the instructor_), I decided to take out the base similarities and made the code more simple.

This is the final code of the _pagination.js_.

```
import View from "./view";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  // Publisher-subscriber pattern
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline"); // event delegation
      if (!btn) return;

      // event delegation
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
    console.log(numPages);

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

```

After that, the page of the website will respond to the number of page it is in. thanks to the early modifications, the pagination gets its page status from controller.js which again exports the data from the model.js

Therefore, the pages are aquired indirectly from model.js to pagination.js

There are of course things the biggest objective which is to get the number of the page. For that, we be getting a new dataset called the number of pages over the markup languages. It is the same technique used over the modal page project.

The logic is that the markup have their own page numbers and after that, we will pass the value of their data to the controller for the renderer to render whenever they are clicked. 

Therefore, the page will be rendered over the recipe search results whenever the user clicks the page pagination.

