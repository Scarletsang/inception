/**
 * @module IdeasRenderer
 * @author Anthony Tsang
 * @description A module to render the "idea" data into a masonry grid.
 */

import RenderEngine from "render-engine";

export const defaultHeights = {
  "h1": 3,
  "h2": 2,
  "p" : 1
};

export default function renderIdeas(ideas, masonryContainer, masonryItemSizes) {
  let renderer = new IdeasRenderer(ideas, {
    masonryItemSizes: sortMasonryItemSizes(masonryItemSizes)
  });
  let result = renderer.render();
  masonryContainer.appendChild(result);
  return masonryContainer;
}

class IdeasRenderer extends RenderEngine {
  constructor(ideas, context) {
    super();
    this.ideas = ideas;
    this.context = context;
  }

  main() {return this.ideas.map(this.idea.bind(this));}

  idea(idea) {
    let {id, contents, ...attr} = idea.toJSON();
    let masonrySize = chooseIdeaSize(contents, this.context.masonryItemSizes);
    return {
      "tag": "div",
      "attr": {
        "classList": ["item", masonrySize],
        "id": id,
        ...attr
      },
      "children": [
        this.addWrapper(this.ideaContentWrapper(), contents.map(this.block.bind(this))),
        this.clickMoreButton()
      ]
    };
  }

  block(block) {
    let {type, content, ...attr} = block.toJSON();
    return {
      "tag": type,
      "attr":{
        "text": content,
        ...attr
      }
    };
  }

  ideaContentWrapper() {
    return {
      "tag": "div", 
      "attr": {
        "classList": ["idea-content"]
      }
    };
  }

  clickMoreButton() {
    return {
      "tag": "button", 
      "attr": {
        "text": "Read More",
        "classList": ["click-more-btn"]
      }
    };
  }
}

function sortMasonryItemSizes(masonryItemSizes) {
  return masonryItemSizes.sort(([_1, x], [_2, y]) => x - y);
}

function chooseIdeaSize(ideaContents, masonryItemSizes) {
  let sum = 0, index = 0, contentIndex = 0;
  while (index < masonryItemSizes.length - 1 && contentIndex < ideaContents.length) {
    const block = ideaContents[contentIndex];
    sum += defaultHeights[block.type] || 0;
    if (sum >= masonryItemSizes[index + 1][1]) {
      index++;
    }
    contentIndex++;
  }
  return masonryItemSizes[index][0];
}
