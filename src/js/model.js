import { async } from "regenerator-runtime";
import { API_URL } from "./config";
import { getJSON } from "./helper";
import { API_KEY } from "./config";

export const state = {
  recipe: {},
  search: {
    query: "", // search query from the user
    results: [], // results of the search query
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
