import { async } from "regenerator-runtime";
import { getJSON } from "./helper";
import { RES_PER_PAGE, API_KEY, API_URL } from "./config";

export const state = {
  recipe: {},
  search: {
    query: "", // search query from the user
    results: [], // results of the search query
    resultsPerPage: RES_PER_PAGE, // results per page
    page: 1, // default 1
  },
  bookmarks: [], // Recipe Bookmarks of the user
};

export const loadRecipe = async function (id) {
  /*
  Recipe Dataclass update + other features
  Updates the current recipe that the user wants to view
  Updates the bookmarks of the recipe
  */

  try {
    const data = await getJSON(`${API_URL}/${id}`); // wait for the fetch to get data
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

    // ensure that bookmark icon stays even if recipe view is changed or refreshed
    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    state.search.page = 1; // set page to 1 if page reloads
  } catch (err) {
    console.error(`Warning from Model.js in requesting recipe details! ${err}`);
    throw err; // rethrow the error to the next importer
  }
};

export const loadSearchResults = async function (search_query) {
  /*
  GET parsed json data from the API
  updates state.recipe
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
    console.error(`Warning from Model.js in requesting search results! ${err}`);
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
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServingsAmount) {
  /*
  UPDATES servings, ingredients and cooking time of the recipe in the recipe View
  Requires int argument
   */

  // update ingredients + calculate amount
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServingsAmount) / state.recipe.servings;
  });

  // update cooking time
  state.recipe.cookingTime =
    (state.recipe.cookingTime / state.recipe.servings) * newServingsAmount;

  // update new recipe servings to the model state
  state.recipe.servings = newServingsAmount;
};

const persistBookMarks = function () {
  /*
  save bookmark to the localStorage even if the website is refreshed
  */

  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // add bookmark
  state.bookmarks.push(recipe);

  // mark current recipe as bookmark
  if (recipe.id == state.recipe.id) state.recipe.bookmarked = true;
  persistBookMarks();
};

export const removeBookmark = function (id) {
  // delete bookmark
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  // unmark current recipe as bookmark
  if (id == state.recipe.id) state.recipe.bookmarked = false;
  persistBookMarks();
};

const clearBookmarks = function () {
  /*
  clear all the bookmarks
  enabling it will remove all bookmarks from localStorage
  */

  localStorage.clear("bookmarks");
};

export const uploadRecipe = async function (newRecipe) {
  // filter recipe ingredients from the upload Recipe
  const ingredients = Object.entries(newRecipe)
    .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
    .map((ing) => {
      const ingArr = ing[1].replaceAll(" ", "").split("");
      if (ingArr.length !== 3)
        throw new Error("Wrong Ingredient Format. Please try again");

      const [quantity, unit, description] = ingArr;
      return {
        quantity: quantity ? +quantity : null, // return Null if quantiy is not a integer
        unit,
        description,
      };
    });
  console.log(ingredients);
};

const init = function () {
  // Adds the bookmarks to the local Storage
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};

// clearBookmarks();
init();
