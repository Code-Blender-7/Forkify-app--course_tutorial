class SearchView {
  #parentEl = document.querySelector(".search");

  getQuerry() {
    try {
      // LOGIC - Store result first. Clear input form and then return stored result
      const query_results =
        this.#parentEl.querySelector(".search__field").value; // stores results
      this.clearInputField();
      return query_results;
    } catch (err) {
      console.error("Warning from searchView.js!", err);
    }
  }

  clearInputField() {
    // clear the input fields
    this.#parentEl.querySelector(".search__field").value = "";
  }

  addHandlerSaerchMethod(handler) {
    this.#parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
