

# START

Recipe list Pagination is where the recipe search result list gets divided into Page 1, Page 2 and so on instead of displaying all the list in a single page. 


This feature is used for enchancing the user experiences and their comfort i.e user friendly

Let's get to work.

### BASIC LOGIC

We know that the ```controllerSearchResults``` function from the controller.js is responsible for the rendering of the search results over the website. So the basic objective is to render the first ten and then render the second ten and so forth. 

Again, after the first render is complete; the second render will be displayed after a click event.

You see that this is where you need the math. You need to find a way to remove the first 10 and then display the second 10.

The best way to do it is to slice the results. But how to slice it dynamitically?

suppose that you slice the first 10 out of the 30 list, you be using the code like this~

```
return myArr.slice(0,9)
```

_note that 0 means 1 and 9 means 10_

so if you can slice 1 to 10, what about 11 to 20?

Well the answer would be like this~

```
return myArr.slice(10,19)
```

So now what? will you just type from 0 to 9 to 19 to 29 and like that again and again? No. There is a better way to do this math. That method is to select a starting number and an end number.

In that case,

```
const start =  0
const end = 9
```

So for page 1 or the first one, we be getting 0 to 10

Let's think more,

Page 1 = 0 to 10
Page 2 = 11 to 20
Page 3 = 21 to 30

Are you seeing a pattern here?
This is the times table math. It means multiplying it by 10 will help us get the result.

So?

_Page 1_
```
const start = 0 *10 // 0
const end = 10// 10
```

Again, we need to add a number that the multiplication could constantly rely on and then the ```end``` value is never 10.

We add a new value of page number for this,

Again for _Page 1_
```
const page = 1
const start = (page-1) *10 // 0
const end = (page * 10)  // 10
```

_Page 2_
```
const page = 2
const start = (page-1) *10 // 10
const end = (page * 10) // 20
```

_Page 3_
```
const page = 3
const start = (page-1) *10 // 21
const end = (page * 10) -1 // 30
```

Pack them in a function and this is what you get,

```
const myFunction = function(page) {
    const start = (page-1)*10
    const end = (page *10)

    return myArr.slice(start,end)
}
```

### Making shortcuts and enchancements.

The new function that will store the math and the per page display is called the ```getSearchResultsPage()```. This is what the code looks like right now.

```
export const getSearchResultsPage = function (page = state.search.page) {

  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9
  return state.search.results.slice(start, end);
};
```

This function returns the recipe list result display based on the number of page it is in. It works by taking the array of the results and separating it by 10. Of course, 10 means the resultPerPage from the state.search.

This is the model.state object from the ```model.js```.

```
export const state = {
  recipe: {},
  search: {
    query: "", // search query from the user
    results: [], // results of the search query
    resultsPerPage: RES_PER_PAGE,
    page: 6, // default 1
  },
};
```

if you have noticed, the default of the page that the function accepts is 1 and the function doesn't need the argument of the list of recipe array results because the code that it uses ensures that it calls the function directly.

Another thing is the RES_PER_PAGE. It is from the ```config.is``` file. Technically this is what contains how much recipes in a single list.




THAT IS ALL.