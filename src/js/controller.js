import * as model from "./model.js";
import recipeView from "./views/recipeViews.js";

import "core-js/stable"; // polyfilling everything
import "regenerator-runtime"; // polyfilling async await
import { async } from "regenerator-runtime";
// import { search } from "core-js/fn/symbol";
import searchView from "./searchView.js";

const recipeContainer = document.querySelector(".recipe");

///////////////////////////////////////

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
    // 1. get results from API
    const query = searchView.getQuerry();
    if (!query) return;

    await model.loadSearchResults(query); // mutate the object of state from model.js

    // 2. Render Results
    console.log(model.state.search);
    console.log(model.state.research);
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
