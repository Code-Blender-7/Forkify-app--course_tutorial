
# START

The recipe servings is a functionality that was disabled at the beginning of the project, now currently active. It is used to display the user the accurate ingrediants for each servings in total.

The recipe servings requires event delegation to work. 

Let's get started.

First and foremost, where should we keep it? Where should the functionality be exisiting? That answer is the view section. Right over the recipeView.js

The reason that it is recipeView.js is because this file handles the rendering of the recipe ingredients and other details related. So it is common to put it there. The recipeView.js has a markup generator called the _generateMarkup.

Over the markup of the function is a section called the recipe__info. That is our target. We need to update that number everytime that the plus and minus signs are clicked. For that we be at first selecting the _parentElement as the .recipe and then select the closest child node of the .btn__tiny. This class holds the signs we need to listen to. We be at first create a function to listen to it. This is the summary of the DOM listening.

```
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--tiny");
      if (!btn) return;
    });
  }

```

For the next phase is to call this function. Now, this will not be called in the recipeView.js and for good reason. It is because we need to call it after the rendering is completed. When the initial rendering is completed, this function will be available. For that, we be exporting the function to the controller. The controller will be initializing the function via the publisher-subscriber pattern.

This is what must be included over there~
```

const init = () => {
  /*
  function init acts as the subscriber of the Publisher-Subscriber Pattern
  */
  recipeView.addHandlerRender(controlRecipe); // handle recipe details rendering
  recipeView.addHandlerUpdateServings(controlServings); // handle recipe servings update rendering [IMPORTANT]
  searchView.addHandlerSaerchMethod(controllerSearchResults); // handle recipe search query
  paginationView.addHandlerClick(controlPagination); // handle web page pagination
};

```

We right now have changed the function to the controller. But now you be asking about the argument that the function receives. This argument is actually a function that the function of the recipeView.js requires.

From this function, we need to return a value to the next function. recipeView.addHandlerUpdateServings have a function argument called the controlServings. Well, that is the new function that never existed before. The controlServings does the following for making your confusion be eased.

1. Updates the model.js 
2. Re-Render the entire recipe details with the new details over the servings.

This is what the controlServings over the controller.js looks like right now~
```

const controlServings = function (newServingsAmount) {
  /*
  function controlServings updates the recipe Servings. 
  */

  // update the recipe SERVINGS in stats
  model.updateServings(newServingsAmount);

  // update the recipe details by re-rendering
  recipeView.render(model.state.recipe);
};
```

_First and foremost, please remember that we have not changed the view.js where the render function comes from. Let that unnecessary thoughts begone_

Now let's get working on the model.js for the updateServings.

This is what the UpdateServings function needs to do.

1. Get the amount of new servings from the recipeView.js
2. Update the data of the model.state and mutate the object as per the servings.

This is what the end function looks like~

```
export const updateServings = function (newServingsAmount) {
  /*
   */
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServingsAmount) / state.recipe.servings;
  });

  state.recipe.servings = newServingsAmount;
};

```

In the final of the function, there is something about updating the servings of the state.recipe

Doing now would update the view.js indirectly from the model.js to update the this._data.servings and display the new servings.

NOW if you run right now, it won't work. Why? Because the newServingsAmount was never given. We need to go back to the start of the implementation over the recipeView.js where the ```addHandlerUpdateServings``` exists. The handler argument that it has needs to have a number of the new servings. This needs to come from the HTML. We already have the DOM elements of the buttons over this function. To get the data of the new Servings, we be using the event delegation and add a new value over the markup called the data-update-to. this value is the centerpiece of the feature.

Add this over the markup

```
    <div class="recipe__info-buttons">
    <button class="btn--tiny btn--increase-servings" data-update-To="${
        this._data.servings + 1
    }">
        <svg>
        <use href="${icons}#icon-plus-circle"></use>
        </svg>
    </button>
    <button class="btn--tiny btn--decrease-servings"  data-update-To="${
        this._data.servings - 1
    }">
        <svg>
        <use href="${icons}#icon-minus-circle"></use>
        </svg>
    </button>

    </div>
```

Finally to wrap this up, we need to listen to the data-update-to.

```
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--tiny");
      if (!btn) return;

      const updateTo = +btn.dataset.updateTo;
      handler(updateTo); // call the argument as a function to whoever uses it.
    });
  }
```

