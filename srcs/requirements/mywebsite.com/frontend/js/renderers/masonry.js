/**
 * @module masonryGrid
 * @author Anthony Tsang
 * @description A lightweighted module to enable masonry grid.
 */

import {createMutationObserver, createResizeObserver} from "helpers"

/**
 * Enable masonry grid on the specified HTML element, providing an array of masonry item sizes.
 * @param {HTMLElement} masonryGrid 
 * @param {Array<[string, number]>} masonryItemSizes 
 */
 export default function enableMasonryGrid(masonryGrid, masonryItemSizes) {
  setmasonryItemSizes(masonryItemSizes);
  setmasonryGridHeight(...arguments);
  const resizeObserver = createResizeObserver((_) => setmasonryGridHeight(...arguments));
  const mutationObserver = createMutationObserver((mutation) => {
    if (mutation.type === "childList") setmasonryGridHeight(...arguments);
  });
  resizeObserver.observe(masonryGrid);
  mutationObserver.observe(masonryGrid, {childList: true, subtree: true});
}

/**
 * Set the masonry item sizes in the pseudo element :root.
 * @param {Array<[string, number]>} masonryItemSizes 
 */
export function setmasonryItemSizes(masonryItemSizes) {
  for (const [className, masonrySize] of masonryItemSizes) {
    document.documentElement.style.setProperty(`--masonry-${className}`, `${masonrySize}`); 
  }
}

/**
 * Set the masonry grid with a calculated height.
 * @param {HTMLElement} masonryGrid 
 * @param {Array<[string, number]>} masonryItemSizes 
 */
export function setmasonryGridHeight(masonryGrid, masonryItemSizes) {
  const area = getmasonryGridArea(...arguments);
  const width = getmasonryColumnCount(masonryGrid);
  const height = Math.ceil(area / width) + getMaximummasonryItemSize(masonryItemSizes) - 2;

  masonryGrid.style.gridTemplateRows = `repeat(${height}, 150px)`;
}

/**
 * Calculate the area of a masonry grid in terms of a grid unit square.
 * @param {HTMLElement} masonryGrid
 * @param {Array<[string, number]>} masonryItemSizes
 * @return {number}
 */
function getmasonryGridArea(masonryGrid, masonryItemSizes) {
  let count = 0;
  loop: 
  for (const item of masonryGrid.children) {
    for (const [className, masonrySize] of masonryItemSizes) {
      if (item.classList.contains(className)) {
        count += masonrySize;
        continue loop;
      }
    }
  }
  return count;
}

/**
 * Get the count of the specified masonry grid.
 * @param {HTMLElement} masonryGrid 
 * @returns {number}
 */
function getmasonryColumnCount(masonryGrid) {
  const compStyles = window.getComputedStyle(masonryGrid);
  const columnList = compStyles.getPropertyValue('grid-template-columns');
  return columnList.split(' ').length;
}

/**
 * Return the largest length of all masonry item class sizes.
 * @param {Array<[string, number]>} masonryItemSizes 
 * @returns {number}
 */
function getMaximummasonryItemSize(masonryItemSizes) {
  return masonryItemSizes.reduce((accu, [_, masonrySize]) => masonrySize > accu ? masonrySize : accu, 0);
}
