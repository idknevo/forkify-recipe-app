class SearchView {
  _parentElement = document.querySelector(".search");

  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }

  _focusInput() {
    this._parentElement.querySelector(".search__field").focus();
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
    this._focusInput();
  }
}

export default new SearchView();
