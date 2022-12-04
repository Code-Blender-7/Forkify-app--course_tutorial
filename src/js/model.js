import { async } from "regenerator-runtime";
import { getJSON } from "./helper";
import { RES_PER_PAGE, API_KEY, API_URL } from "./config";

export const state = {
  recipe: {},
  search: {
    query: "", // search query from the user
    results: [], // results of the search query
    resultsPerPage: RES_PER_PAGE,
    page: 1, // default 1
  },
};

export const loadRecipe = async function (id) {
  /*
  get details on the recipe. Takes an id and updates/mutates state object on model.js
  */

  try {
    const data = await getJSON(`${API_URL}/${id}`);
    let { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(`Warning from Model.js! ${err}`);
    throw err; // rethrow the error to the next importer
  }
};

export const loadSearchResults = async function (search_query) {
  /*
  Provides info for the rendering of the recipe query result list.
  Updates/mutates state from model.js for additional 
  Requests data from server.
  */

  try {
    const data = await getJSON(
      `${API_URL}?search=${search_query}&key=${API_KEY}`
    );
    state.search.query = search_query;
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec.source_url,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.error(`Warning from Model.js! ${err}`);
    throw err; // rethrow the error to the next importer
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  /*
  Creates paging for the site.
  returns values to update state on model.js
  Pagination Logic. See logs 008 of development-logs. Section BASIC LOGIC
  */

  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9
  console.log(start, end);
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServingsAmount) {
  /*
   */
  console.log(state.recipe);
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServingsAmount) / state.recipe.servings;
  });

  state.recipe.servings = newServingsAmount;
};
