/**
 * @module DataHandler
 * @author Anthony Tsang
 * @description A module to map incoming data from server to an appropriate structure that can be poured into the masonry grid.
 */

import Serializable from "serializable";

/**
 * A class describing the data representing an idea.
 * @property {String} id
 * @property {Array<Block>} contents
 * @property {Object.<String, String>} [attr]
 */
export class Idea extends Serializable{
  constructor(json) {
    super(json)
    this.mandatoryFields(["id", "contents"]);
    this.optionalFields([["props", "attr"]]);
    this.mutateField("contents", (blocks) => {
      return blocks.map((block) => new Block(block));
    });
  }

  static create(id, contents, attr) {
    return new Idea({id, contents, attr});
  }
}

/**
 * A class describing a block of HTML element.
 * @property {String} type
 * @property {String} content
 * @property {Object.<String, String>} [attr]
 */
export class Block extends Serializable{
  constructor(json) {
    super(json);
    this.mandatoryFields(["type", "content"]);
    this.optionalFields(["attr"]);
  }

  static create(type, content, attr) {
    return new Block({type, content, attr});
  }
}
