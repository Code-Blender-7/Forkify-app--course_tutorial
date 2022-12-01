import { async } from "regenerator-runtime";
import { getJSON } from "./helper";
import { API_URL } from "./config";
import { API_KEY } from "./config";
import { RES_PER_PAGE } from "./config";

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

// loads the search results. takes a string of recipe name.
// "requests" from API to fetch results.
export const loadSearchResults = async function (search_query) {
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
  Logic. See logs 008 of development-logs. Section BASIC LOGIC
  */

  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9
  console.log(start, end);
  return state.search.results.slice(start, end);
};
