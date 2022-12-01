import * as model from "./model.js";
import recipeView from "./views/recipeViews.js";

import "core-js/stable"; // polyfilling everything
import "regenerator-runtime"; // polyfilling async await
import { async } from "regenerator-runtime";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

// if (module.hot) module.hot.accept(); // Coming from Parcel

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

const recipeContainer = document.querySelector(".recipe");

// function to handle render of recipe data
const controlRecipe = async function (El) {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1 loading recipe
    await model.loadRecipe(id);

    // 2 rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(`Warning from controller.js! ${err}`);
    recipeView.renderError();
  }
};

// function to handle user recipe search query
const controllerSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1. get results from API
    const query = searchView.getQuerry();
    if (!query) return;

    // 2. Await results from server
    await model.loadSearchResults(query); // mutate the object of state from model.js

    // 3. Render Results
    resultsView.render(model.getSearchResultsPage());

    // 4.Render Pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(`Warning from controller.js! ${err}`);
  }
};

// Publisher-Subscriber Pattern
// Calls the function here and not in the export file.
const init = () => {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSaerchMethod(controllerSearchResults);
};

init();
