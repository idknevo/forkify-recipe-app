import View from "./view.js";
import previewView from "./previewView.js";

class bookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks");
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;
  _message = ``;

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateHtml() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join(``);
  }
}

export default new bookmarksView();
