class SearchView {
  _parentElement = document.querySelector(".search");

  getQuerry() {
    try {
      // LOGIC - Store result first. Clear input form and then return stored result
      const query_results =
        this._parentElement.querySelector(".search__field").value; // stores results
      this._clearInputField();
      return query_results;
    } catch (err) {
      console.error("Warning from searchView.js!", err);
    }
  }

  _clearInputField() {
    // clear the input fields
    this._parentElement.querySelector(".search__field").value = "";
  }

  addHandlerSaerchMethod(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
