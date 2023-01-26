import * as model from "./model.js";
import "core-js/stable"; // polyfilling everything
import "regenerator-runtime"; // polyfilling async await
import { async } from "regenerator-runtime";

import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import recipeView from "./views/recipeViews.js";
import bookmarksView from "./views/bookmark.js";

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

const recipeContainer = document.querySelector(".recipe");

const controlRecipe = async function (El) {
  /*
  function controlRecipe handles the rendering of the recipe details.
  Takes a hash id of the recipe and renders it by calling View
  */

  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 0. Update results view
    resultsView.update(model.getSearchResultsPage());

    // 1 loading recipe from server
    await model.loadRecipe(id);

    // 2 rendering recipe
    recipeView.render(model.state.recipe);

    // 3. Update Bookmarks
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
    console.error(`Warning from controller.js! ${err}`);
  }
};

const controllerSearchResults = async function () {
  /*
  function controllerSearchResults updates the recipe query rendering
  Handlers pagination of the first page ONCE.
  */

  try {
    // 0. ADD loading animation
    resultsView.renderSpinner();

    // 1. GET results from API
    const query = searchView.getQuerry();
    if (!query) return;

    // 2. await results from server
    await model.loadSearchResults(query); // mutate the object of state from model.js

    // 3. RENDER Results
    resultsView.render(model.getSearchResultsPage());

    // 4. RENDER Pagination
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError("Something Went Wrong. Let's Try Again.");
    console.error(`Warning from controller.js! ${err}`);
  }
};

const controlPagination = function (goToPage) {
  /*
  function controlPagination updates the recipe list paging. 
  Handles Pagination of the site.
  */

  // 1. Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // 2. Render NEW buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServingsAmount) {
  /*
  function controlServings updates the recipe Servings. 
  */

  // update the recipe SERVINGS in stats
  model.updateServings(newServingsAmount);

  // update the recipe details by re-rendering
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1. add bookmark if no bookmark was present
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  // remove bookmark if bookmark is present
  else if (model.state.recipe.bookmarked)
    model.removeBookmark(model.state.recipe.id);

  // 2. update display of the recipe view
  recipeView.update(model.state.recipe);

  // 3. render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

/////
/////
// Publisher-Subscriber Pattern

const init = () => {
  /*
  function init acts as the subscriber of the Publisher-Subscriber Pattern
  */
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe); // handle recipe details rendering
  recipeView.addHandlerUpdateServings(controlServings); // handle recipe servings update rendering
  searchView.addHandlerSaerchMethod(controllerSearchResults); // handle recipe search query
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  paginationView.addHandlerClick(controlPagination); // handle web page pagination
};

init();
