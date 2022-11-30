/*
Used for rendering the results of the query recipe search.
Note that this object inherits from "View.js"
*/

import icons from "url:../../img/icons.svg";
import View from "./view.js";

class resultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "The recipe was not found for your recipe. Please try again.";
  _successMessage = "...";
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(results) {
    return `
        <li class="preview">
            <a class="preview__link" href="#${results.id}">
                <figure class="preview__fig">
                    <img src="${results.image}" alt="${results.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${results.title}</h4>
                    <p class="preview__publisher">${results.publisher}</p>
                </div>
            </a>
        </li>

    `;
  }
}

export default new resultsView();
