### Details

File Name - config.js
Location - src/js

### Imports, exports, inheritance, relations description

1. Imports - None
2. Exports - 4 variables
3. Inheritance - None
4. Relations - model.js, helper.js


* [__export__] API_URL = URL for the API database. Used for the fetch.
* [__export__] TIMEOUT_SECONDS = Time before the program stops due to poor network and no receive from the API database.
* [__export__] API_KEY = Key required for the API database for auth.
* [__export__] RES_PER_PAGE = Number of search results per page in the search results's pagination feature.

### Code file's purpose / job

The purpose of this code file is to act as a configuration file for the way the website behaves. The config file also acts as a solution so that the developers won't call these values as a magic number. It mainly exports to the model and the helper for configuration of how the website should be while also providing the API data.

However, in the future iterations of this file is a possibility that the API data are moved. If so, this code file will be edited.

### Function Details (if any)
None

### Special Remarks, notes (if any)
Code may be subject to change in case of security risk of the leak of the API keys.
The file location is also subject to change.