

# START

Imagine that you are given a website css and a html. Even before you started properly disecting the code, you are given the task to make this project operational. the first task is to display the recipe of the project forkify. 

Good news is that the CSS works and the HTML is completed. The forkify project works by injecting HTML templates over and over again. If the user changes the recipe, the HTML templete would be cleared(empty) and then the new modified HTML templete would be inserted. 

That is what we call "__Rendering recipe__" in the forkify project.

There were some complications like the fact that the HTML insertAdjacent being "afterend" and "beforeend"

However, That can be handled.

The First step is to get the recipe data from the API. Afterwards, we need to break it down into specific data and from there, we could assign these data and get the job done.

Jonas used the idea of keeping the search scope of the data and then insert the html via it.

```
    let { recipe } = data.data;

    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
```

This is the breakdown of the whole system. We could use the templete literal to insert the data to the html. That is how the work is done here.

