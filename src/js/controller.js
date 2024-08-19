import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import { FORM_CLOSE_SECONDS } from "./config.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.loadSpinner();

    resultsView.update(model.resultsPerPage());

    bookmarksView.update(model.state.bookmarks);

    await model.loadRecipes(id);
    const { recipe } = model.state;
    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderErrorMessage();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.loadSpinner();
    const query = searchView.getQuery();
    if (!query) throw new Error();

    await model.loadSearchResults(query);

    resultsView.render(model.resultsPerPage());

    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderErrorMessage();
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.resultsPerPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlAddBookmarks = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlUploadRecipe = async function (newRecipe) {
  try {
    addRecipeView.loadSpinner();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, FORM_CLOSE_SECONDS * 1000);
  } catch (err) {
    addRecipeView.renderErrorMessage(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUploadRecipe(controlUploadRecipe);
};

init();
