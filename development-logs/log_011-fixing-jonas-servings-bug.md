__NOTE. THIS IS A SPECIAL LOG THAT IS NOT INCLUDED TO BE IN THE COURSE. THE CONTENTS HERE ARE DONE PERSONALLY.__

#START

Assuming that the recipeServings is completed and it is fully operational. We have a new bug at our hands. If the servings "minus" button hits 1, it keeps going down and the update servings are all meaningless. For that we need to fix that. 


To reproduce this bug, keep hitting the minus servings to below 0. 

Now start brainstorming the ideas. And then start thinking how to solve this issue. 
Let me share my idea. We will disable the button minus if the value sets to 1 and then re-enable it if the value of servings is above 1. 

Jonas does not have a SCSS for that. So we be creating our own. Navigate to the _components.scss and then locate the .btn__tiny over it.
Below, add this property style

```

.btn--tiny.disabled {
  pointer-events: none;
  opacity: 0.5;
}

```

Note that the pointer-events if set to none will not respond. pointer-events if set to auto will respond normally.

After that, we be creating a new function called the _generateLimiter that takes no arguments. This is the exact replica of the addHandlerUpdateServings.
Let's create this function right now.

This is my code for the bug~

```
  _generateLimiter() {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--tiny");
      if (!btn) return;

      const updateTo = +btn.dataset.updateTo;
      if (updateTo === 0) btn.classList.add("disabled");
    });
  }
```
To call this function, we need to put it into the _generateMarkup.

```
_generateMarkup() {
    this._generateLimiter();
    //// snip ////
}
```

Note, there are many other ways to make the code be more improved over and over. My first recommendation is that you don't embed a return code over the markup directly. We need to make sure that the disabled classlist over the _generateLimiter needs to go away after the servings reaches over 1.

_NOTE THAT THERE MAY BE A PART 2 ABOUT THE FIXING OF THIS BUG._