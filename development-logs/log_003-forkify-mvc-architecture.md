

# START


### Why need a architecture?
We need an architecture to ensure that the housing of the software is planned. It is because if the project gets too large, then the basic knowledge of how the software should work gets complicated to a point that the entire structure of the code could be compromised. It would of course eventually lead to nothing but the delay of the software to be released over time.

### Achieve a good architecture...

The first comes the structure. it is the first step where the core code files are located. the second is maintainability where the structure code is kept and it maintained if there were a bug of a sort. The third is called expandability where the code structure is expanded to include more and numerous features. A good architecture stays in the middle of it.

Examples include the MVC, MVP, Flux etc. Modern js devs uses frameworks to handle their own architecture like react, vue, angular etc.

There are a couple of core components that a good architecture should have.

* _Business Logic_ - 
Code that solves the actual assignment i.e problems directly by storing logic. Examples are like calculating data, sending messages, storing data.
</br>

* _State_ - 
Stores all the data of the application. It should return or be a single course of truth where all the data is centerend here. It should be in sync to the user. It is also where the libraries are used.
</br>

* _HTTP Library_ - 
Responsible for maintaining the AJAX requests. Examples include the fetch functions. 
</br>

* _Application Logic (Router)_ - 
Code that is concerned of implementing the application itself. Examples include navigation and UI events.
</br>

* _Presentation Logic (Ui layer)_ - 
Code that is concerned of the visible part of the application itself. It displays the application state. You could say that it's role is the syncing with the state and vice-versa.
</br>

#### Explaining the MVC concept
MVC means Model View Controller. It contains three big parts. 

1. Model - Business logic, State, HTTP Library
2. View - Presentation Logic
3. Controller - Application logic. It is the bridge of View and Model.

Think that the web starts with the Model and ends with the View as the user.

Thinking that the user did an action, the controller would handle that. The controller would need the data from the model and then the model would interact with the web using the fetch request and then return the data to the controller. After that, the controller would return the data to the view for the presentation logic.



#### Forkify-app code structure.

Forkify app needs to render the recipe from the hash it receives.
Simple.


The controller connects the model and the view. You could say the controller will pass the variables to the other functions in model and View. the model will get the data from the internet and break it down turning it into an array and passing that array to View. The job of view is to render the recipe that is provided via the data of the model.js which again it got from controller.js

This kind of architecture is used to ensure that the code structure could be understood as fast as possible.

Forkify deletes the render output and then it again displays another render output as the user changes the recipes.
