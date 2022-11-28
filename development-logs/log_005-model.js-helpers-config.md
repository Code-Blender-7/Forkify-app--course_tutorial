

# START

The model.js as said over the previous logs is a file that handles all the incoming data from the API server and then passes it to the controller.js


__please for the sake of mvc, don't import directly from model.js to the Recipe.js (view file). it could be a bad practice. to fix it, import the model.js from controller.js and initialize recipeView.js on controller.js__

model.js is very important for requesting the data. Overtime, it is a confusing time where the URL  to the API could literally change at any minute. for that and additional data enchancements for model.js, a file called config.js is created that stores the necessary files ONLY for model.js and its sub-files.

this is where we will store the API link.

```
// inside config.js

export const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";
```

Again, there is another file called helper.js that will do the JSON parsing of the model.js and the response exception handling. The biggest advantage of such design is that the code errors could be broken down into the files where they are currently contained and in sync with model.js.


Think of model.js as a HR Manager (_I am talking real life stuff_). There are two employees called config.js and the helper.js

Both are neccessary of the model.js but they have seperate tasks. If one fails the task, we could use their exception handling and then fix the problem by finding it VERY FAST.

It is like fixing a car engine not as a whole but by breaking it apart.

the helper.js as said will contain the JSON parsing and response handling.

Afterwards, the helper.js will have a new task called the TIMEOUT-REJECT. It is where the code will reject if the fetch is taking too long. Jonas did a good trick over it.

If you call the Timeout as a promise and once the task is done, you will reject it then it will act or work as a timer to automatice reject.

If you Promise.race both the timeout and the request fetch data, the result would be that the request must be done ASAP or the Promise will select the Timeout and then the code will print, "Timeout! Program took too long to respond!"

Code => 
```
const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]); // reject promise if the request fefch was a weak connection
```

and ofc the timeout, 

```
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long after ${s} seconds`));
    }, s * 1000);
  });
};
```


If you are wondering about the TIMEOUT_SECONDS. It is a variable that comes from the config.js

The reason this exists is because timeout needs a value and if we directly insert one, it could be counted as a magic number that is JUST THERE confusing the developers.

Therefore, the TIMEOUT_SECONDS contain the amount of seconds for the developers to not "think" about magic numbers.