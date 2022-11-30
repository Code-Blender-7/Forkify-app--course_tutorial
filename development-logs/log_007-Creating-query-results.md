This is about the creation of the query results display of the forkify project.


# START

The query results is where the display of the user query is displayed. So if you search for "burger" then you will see a list of search results from that query search.

Well, this log is about the creation of that.

First and foremost, To create the query results display we need to run some tests that we won't be deploying on the project yet. First we need to learn properly how to use the API server. The API server uses a link that is __REDACTED__.

From this link, we must request according to the search query of the user. So, if the user types 'pizza', what does that mean? It means that the website API link be included of 'pizza' recipe. If you where to just fetch and JSON parse the data, you will get a list of recipes. This is the big game now. 

1. We need to update the search results everytime the user types a new one. 
2. We need to display the search results as a list over the website. 
3. We need to update the recipe render everytime the user clicks on a new recipe.

By update, I mean technically to clear the HTML markups and replace them with the new one. Easy? You guessed so. If not, read this log again.

To update the search results, we must create a function that returns a new set of array based on the user search query. After that, we need to store that results array for mutation everytime the user searches something new.  That means to create two export files.

For calling the recipe list from the API (_the first step_), we have the file called model.js as the model of the MVC to handle the data fetching. After that, we need to add the results to a object.  Let's call it state.

```
export const state = {
  recipe: {},
  search: {
    query: "", // search query from the user
    results: [], // results of the search query
  },
};
```

After that, we need to update this state with the new values.
```
export const loadSearchResults = async function (search_query) {
  try {
    const data = await getJSON(
      `REDACTED`
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

```

Now that, where should we export this function and the object. If you guessed it, it is the part where we need to display the results. But unfortunately we can't. Because the MVC controller forbids the import between the model and the view. 

that means that the code is required to be in the controller.js and then the value be passed via the publisher subscribing pattern. What does that mean?  You could get the details from the 6th log called the [Publisher-Subscriber-Pattern on this folder](./log_006-Publisher-Subscriber-pattern.md).

After we export both the function and the model to the controller.js, we need to create a new function in the controller.js that handles the passing of the query data and its rendering.

That be this code.

```
// function to handle user recipe search query
const controllerSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1. get results from API
    const query = searchView.getQuerry();
    if (!query) return;

    await model.loadSearchResults(query); // mutate the object of state from model.js

    // 2. Render Results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.error(`Warning from controller.js! ${err}`);
  }
};
```

Now let's initialize this function at the start.

```
const init = () => {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSaerchMethod(controllerSearchResults);
};

init();

```

After reviewing the code, you be finding two variables. ```resultView``` and ```searchView```

For searchView is where the user data is aquired from the query. For the resultView is where the user data is then processed and after then, it generate a new markup based on the list that it gets.

For these files that are involved, there are cases where they use the same function. For that, the option is create objects and extend them to a central parent element and acting as a inheritance. That is call the view.js

This file is containing all the error messages, configs, and similarities that could happen to the resultViews and the searchViews.