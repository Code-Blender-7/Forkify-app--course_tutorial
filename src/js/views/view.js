import icons from "url:../../img/icons.svg";

export default class View {
  _data;
  // inject new HTML to render
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data; // stores API data as a object variable property
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear(); // clear data as a refresh
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    // clear HTML
    this._parentElement.innerHTML = "";
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // virtual DOM
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));

    // current DOM
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (
        // if the virtual element is not equal to the current element AND virtual element nodeValue of text is not empty:
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      // update changed attributes
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
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
    const messageMarkup = ` 
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
    this._parentElement.insertAdjacentHTML("afterbegin", messageMarkup);
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
