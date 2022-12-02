import icons from "url:../../img/icons.svg";

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data; // stores API data as a object variable property
    this._clear();
    this._parentElement.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup()
    ); // inject new HTML to render
  }

  _clear() {
    this._parentElement.innerHTML = ""; // clear HTML
  }

  // render the Error message
  renderError(message = this._errorMessage) {
    const error_markup = ` 
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
      `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", error_markup);
  }

  // render the default message
  renderMessage(message = this._successMessage) {
    const error_markup = ` 
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-alert-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
      `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", error_markup);
  }

  renderSpinner = function () {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>  
      
      `;
    this._clear(); // empty the parent
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  };
}
