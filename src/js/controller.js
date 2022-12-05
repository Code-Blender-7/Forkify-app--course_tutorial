import * as model from "./model.js";
import "core-js/stable"; // polyfilling everything
import "regenerator-runtime"; // polyfilling async await
import { async } from "regenerator-runtime";

import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import recipeView from "./views/recipeViews.js";
// if (module.hot) module.hot.accept(); // Coming from Parcel

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

    // 1 loading recipe from server
    await model.loadRecipe(id);

    // 2 rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(`Warning from controller.js! ${err}`);
    recipeView.renderError();
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

/////
/////
// Publisher-Subscriber Pattern

const init = () => {
  /*
  function init acts as the subscriber of the Publisher-Subscriber Pattern
  */
  recipeView.addHandlerRender(controlRecipe); // handle recipe details rendering
  recipeView.addHandlerUpdateServings(controlServings); // handle recipe servings update rendering
  searchView.addHandlerSaerchMethod(controllerSearchResults); // handle recipe search query
  paginationView.addHandlerClick(controlPagination); // handle web page pagination
};

init();
