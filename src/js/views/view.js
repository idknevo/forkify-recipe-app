import icons from "url:../../img/icons.svg";
import { spiral } from "ldrs";

export default class View {
  _data;
  render(data, render = true) {
    this._data = data;
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage();
    const html = this._generateHtml();
    if (!render) return html;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  update(data) {
    this._data = data;
    const newHtml = this._generateHtml();

    const newDom = document.createRange().createContextualFragment(newHtml);
    const currentElemet = Array.from(this._parentElement.querySelectorAll("*"));
    const newElement = Array.from(newDom.querySelectorAll("*"));

    newElement.forEach((newEl, i) => {
      const curEl = currentElemet[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  loadSpinner() {
    spiral.register();
    const html = `
      <div class="spinner">
          <l-spiral
            size="50"
            speed="0.8" 
            color="#f48b82" 
          ></l-spiral>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderErrorMessage(message = this._errorMessage) {
    const html = `
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
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderMessage(message = this._message) {
    const html = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
}
