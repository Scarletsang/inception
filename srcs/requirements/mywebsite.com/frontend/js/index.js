import {Idea} from "data";
import renderIdeas from "renderers/ideas";
import enablemasonryGrid from "renderers/masonry";
import enablePopup from "renderers/popup";

window.entry = function entry(ideasJSON) {
  window.addEventListener("DOMContentLoaded", () => main(ideasJSON));
}

function main(ideasJSON) {
  const masonryGrid = document.getElementsByClassName("masonry")[0];
  const popupContainer = document.getElementsByClassName("popup")[0];
  const closePopupBtn = popupContainer.getElementsByClassName("close-popup-btn")[0];
  const masonryItemSizes = [
    ["short", 1],
    ["medium", 3],
    ["tall", 4]
  ];
  const ideas = ideasJSON.map(idea => new Idea(idea));
  renderIdeas(ideas, masonryGrid, masonryItemSizes);
  enablemasonryGrid(masonryGrid, masonryItemSizes);
  enablePopup(popupContainer, closePopupBtn, masonryGrid);
}
