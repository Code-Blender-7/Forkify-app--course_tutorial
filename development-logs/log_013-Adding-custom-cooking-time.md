# START

After the core features of the new projects were half implemented successfully. There was some room for improvement left to be done. For example,  the servings bug that was fixed recently. It was fixed because of some modifications to the main scss. the reports are located over the log_011.


Now, there is a new improvement to do. This is about the cookingtime. We know that the cooking time is updated from the model.js and then it is used as a extension to the view.js for passing the data and rendering them. 


## ADDING THE COOKING TIME FUNCTIONALITY
The original idea for this cooking time was to get the number of servings and adjust them according. It follows the same methods like the ingredients servings. 

The result was that the cookingTime is updated everytime the user changes the servings.
Let's start going higher now. The result of the cookingTime was in minutes. We need to convert it into hours and minutes to be more user friendly.

For that, we be creating a new function inside the recipeView.js and naming it _generateCookingTime. Inside, we be returning a new markup that includes the html for the cooking time text and numbers.

We be creating a new algorithm that helps us to convert the total minutes into our desired results. After multiple testing and performance benchmarks, this is the result here~

```
const hours = Math.trunc(totalMinutes / 60);
const minutes = +(totalMinutes % 60).toFixed();
```

After wards, we be creating new variables that states either they are minutes, hours or minute, hour based on their values. 
Therefore, this is done in terinary method~

```
const hoursString = hours > 1 ? "hours" : "hour";
const minutesString = minutes > 1 ? "minutes" : "minutes";
```

Now we need to return the results of the following as a templete for the markup~

```
  _generateCookingTime(totalMinutes) {
    const hours = Math.trunc(totalMinutes / 60);
    const minutes = +(totalMinutes % 60).toFixed();
    const hoursString = hours > 1 ? "hours" : "hour";
    const minutesString = minutes > 1 ? "minutes" : "minutes";

    return `
      <span class="recipe__info-data recipe__info-data--hours">${hours}</span>
      <span class="recipe__info-text">${hoursString}</span>
      <span class="recipe__info-data recipe__info-data--minutes">${minutes}</span>
      <span class="recipe__info-text">${minutesString}</span>
      `;
  }
}
```

We will embed it directly below the .recipe__info

## ISSUES

There were a issue while cooking with the code. The issue is that the return markup if it included a conditional statement would make recipe__ingredients be disappered. It actually never occured before to me. But I haven't added all the features yet. There could be changes that this is linked to the the features of the adding new recipe and ingredients by jonas. 