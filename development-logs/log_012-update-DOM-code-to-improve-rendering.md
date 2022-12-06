

# START

There is a sense of congratulations here because we have been able to make the app website of forkify be operational. That is a feat and good job to both of us. Now, let's get working on this about the update of the DOM code to improve rendering. Now, trust me that this name makes little sense to you. Let me explain.

We have a function called the render over the view.js which handles the rendering of the recipe details and the recipe results from the query search. But there is a bad news about it. We have a issue where if we were to inspect the app and like change the servings, the entire inspection window will be reloaded. Now that is a big issue because the only reason that it'll ever do something like that is because the code is being refreshed all over again just because of a small change. We don't want that. Not because of the inspection window but we also see flickering over the project whenever we call the rendering again and again.

So our objectives are simple. To render the project once and only update-render the parts that are changed. 

We start off by creating a new function over the view.js called the update() which takes an argument called the data or should I say, the data of the model.state over the recipe.

This is almost the same as the previous render function just with a strict update condition over it.

This is what the code looks like at the start~

```

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
}
```

The next thing we need to do is to get the list of changes that happens over the app. For that we be creating a new virtual DOM and a current DOM. The virtual DOM is more like a clone of the current DOM; the only change is that the virtual DOM has all the new changes that the current DOM doesn't. When we call the function, we only need to update the changes of the virtual DOM over the current DOM. Let's start by creating two new variables inside the function.

```
// virtual DOM
const newDOM = document.createRange().createContextualFragment(newMarkup);
const newElements = Array.from(newDOM.querySelectorAll("*"));

// current DOM
const curElements = Array.from(this._parentElement.querySelectorAll("*"));
```

the newDOM is a clone of the newMarkup that is of course the entire recipe details. That includes the same as the parentElement called the .recipe

We just query select them all.

After that, we add the changes using conditional statements.

```

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (
        // if the virtual element is not equal to the current element AND virtual element nodeValue of text is not empty:
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // console.log(newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // update changed attributes
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
```

Over this, we need to get the changes over the newDOM to the currentDOM. We need the details of the attributes and the textContent that are changed. After that, we are set and then we set the attribute of the specific chosen attributes over the newDOM to the currentDOM.

To active this, we add this to the controller.js

```
const controlServings = function (newServingsAmount) {
  /*
  function controlServings updates the recipe Servings. 
  */

  // update the recipe SERVINGS in stats
  model.updateServings(newServingsAmount);

  // update the recipe details by re-rendering
  recipeView.update(model.state.recipe);
};

```

It is recommended that you watch jonas's course over this to get the accurate explanation. I just explained everything in a nutshell.