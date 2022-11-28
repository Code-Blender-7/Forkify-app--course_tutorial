# START

The project by Jonas is powered by the API server. the first thing that needs to be done is to work with the recipes list.

If you see the demo of the forkify app. You will notice that the id of the link is what is changing the most. It means that all the recipes are bounded by their own unique id. This id is called the Hex code in web development.

if you create a link element over the html file and only paste the hex code like this,

```
<a href="#5ed6604591c37cdc054bcb34">Recipe 2</a>
```

You will find a link in your html page. It is a simple link. HOWEVER, this link will return a hex code that you could use to change to your other recipe.

To detect this hex code, you could add the following code to your js file,

```
const id = window.location.hash.slice(1);
```

and then just add this to the recipe link for the fetch to get a response.

So far, what is discussed is the concept of detecting the hex code and using that hex code to get the recipe details.

In case that the HEX code changes, the window needs to detect it and update the recipe.


we can use this code for that, 

```
["hashchange, load"].forEach((event) =>
  window.addEventListener(event, showRecipe)
);
```