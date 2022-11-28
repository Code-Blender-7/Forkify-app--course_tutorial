I promise that it is a very short log.

# START

This is a very simple development log. Don't know if it is actually a thing called the Publisher-Subscriber Pattern. 

#### What is this about??

Publisher-Subscriber Pattern is a technique about Event Handler in the MVC. It is a concept where one function from another file acts as a event but it is initialized in another file. You may think that it is as like as any export functions in a JS project. Well, that is not the case in the DOM elements. 

#### Why is it required in the Project?

In the file of ```controller.js```, it required the DOM elements of hashchange and load elements. However, there is another argument where this functionality shouldn't be in the ```controller.js``` but in the ```recipeView.js``` file which is the view file. 

The best approach would be to export the data from ```controller.js``` to ```recipeView.js```. However, that is a violation of the MVC architecture. It is because controller doesn't export data. It imports it and calls it in its own file.



Funny thing is that the solution is very straightforward. The Publisher-Subscriber pattern is where when a function is created which is the Publisher and the function is used at time which is called the Subscriber.

The file code of the DOM elements were located in the ```controller.js``` and it was moved to ```recipeView.js```.

This is what the code looks like - 

```
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }
```
The handler argument takes the function and then it will call it in. The thing is that the function was located in recipeView and it was called on controller after initializing.