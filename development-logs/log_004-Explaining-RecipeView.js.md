Please note that this file could be changed over time as the main project is not created yet.

# START


## Explaining the _RecipeView.js_
_The reason this section exists is because the whole rendering of the results of user search are handled by this file. This file according to Jonas and to me is very complex _

The RecipeView.js is the View file of the Forkify app.

RecipeView contains a class object that when it exports, it creates the render data and inject the new HTML markup to the main website.

RecipeView doesn't do any calculations. It handles the display of the recipe like showing the ingredients, servings, descriptions etc.  

Jonas coded the RecipeView to make sure that it is private and distinctive. 

The class has multiple variables
```#parentElement``` is the DOM element of the recipe where the markup will be injected.

```#generateMarkup``` is where the markup is located. 

render() is a method where it takes an argument called data and then the render()'s value of argument is used over the ```#generateMarkup```.

Inside the render method stores the ```#generateMarkup``` value. the ```#generateMarkup``` variable is passed to the ```recipeContainer``` or called the ```#parentelement``` and then it is injected when called.
render() acts as a synchronous code. 


```clear()``` is a method where the innerHTML will be cleared to ensure that the HTML index doesn't stack and delete before the new injection.

RecipeView is of course if you guessed initialized by the controller.js

RecipeView uses a new library called __factional__ that handles the decimal issue of the ingredients to make the code look nice.