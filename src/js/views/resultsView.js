/*
Used for rendering the results of the query recipe search.
*/

import icons from "url:../../img/icons.svg"; // Parcel imported itself
import previewView from "./previewView.js";
import View from "./view.js";

class resultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "The recipe was not found for your recipe. Please try again.";
  _successMessage = "...";
  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
}

export default new resultsView();
