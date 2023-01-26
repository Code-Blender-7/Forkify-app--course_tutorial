/*
Used for rendering the bookmarks of the recipe.
*/

import icons from "url:../../img/icons.svg"; // Parcel imported itself
import previewView from "./previewView.js";
import View from "./view.js";

class bookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet.";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new bookmarksView();
