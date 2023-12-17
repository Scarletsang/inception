/**
 * @module Serializable
 * @author Anthony Tsang
 * @description A module that provides the `Serializable` class that helps making classes that read data from JSON data.
 */

import {isString, addMemorizationTo, extractFieldsFromObj} from "helpers"

/**
 * JSON Object type
 * @typedef {Object.<String, JSONValue>} JSONObj
 */

/**
 * JSON Object value type
 * @typedef {String | Number | Array<JSONValue> | Boolean | Null | JSONObj} JSONValue
 */

/**
* A Type for object fields
* @typedef {String | [String, FieldMutation]} Field
*/

/**
* A Type of Field mutation
* @typedef {String | FieldMutationFunction} FieldMutation
*/

/**
* Function type for field mutation
* @typedef {((fieldName: String, content: JSONObj) => [String, JSONable]) | (content: JSONObj) => JSONable} FieldMutationFunction
*/

/** @abstract */
class JSONable {
  toJSON(key = null) {throw new Error('must be implemented by subclass!');}
}
 
export default class Serializable {
  /**
  * Initialize a serializable class instance.
  * @param {String | JSONObj} jsonOrJsonObj 
  */
  constructor(jsonOrJsonObj) {
    /** @type {String | JSONObj} */
    this.jsonObj = isString(jsonOrJsonObj)? JSON.parse(jsonOrJsonObj) : jsonOrJsonObj;
    let obj = addMemorizationTo(this);
    obj.memorize("JSONFields", new Set());
    return obj;
  }

  /**
  * Specify mandatory fields to be extracted from the JSON object.
  * @param {Array<Field>} fields 
  */
  mandatoryFields(fields) {
    for (const field of fields) {this.setField(field);}
  }

  /**
  * Specify optional fields to be extracted from the JSON object.
  * @param {Array<Field>} fields 
  */
  optionalFields(fields) {
    for (const field of fields) {
      if (field in this.jsonObj) this.setField(field);
    }
  }

  /**
  * Set a field to the current object. Possible to include mutation.
  * @param {Field} field 
  */
  setField(field) {
    if (Array.isArray(field)) {
      this.mutateField(field[0], field[1]);
    } else {
      this[field] = this.jsonObj[field];
      this.mutateMemorized("JSONFields", (fieldNames) => fieldNames.add(field));
    }
  }

  /**
  * Describe how to mutate a field during extraction.
  * @param {String} fieldName 
  * @param {FieldMutation} mutation 
  */
  mutateField(fieldName, mutation) {
    if (!mutation) return;
    let mutatedFieldName;
    if (isString(mutation)) {
      mutatedFieldName = this.mutateFieldByString(fieldName, mutation);
    } else if (mutation instanceof Function) {
      mutatedFieldName = this.mutateFieldByFunction(fieldName, mutation);
    }
    if (mutatedFieldName === undefined) return;
    this.mutateMemorized("JSONFields", (fieldNames) => fieldNames.add(mutatedFieldName));
  }
  
  mutateFieldByString(fieldName, mutationString) {
    let fieldValue = this.jsonObj[fieldName];
    let mutatedValue = fieldValue == undefined ? fieldValue : this.jsonObj[fieldValue];
    this[mutationString] = mutatedValue;
    return fieldName;
  }
  
  mutateFieldByFunction(fieldName, mutationFunction) {
    if (mutationFunction.length == 1) {
      this[fieldName] = mutationFunction(this.jsonObj[fieldName]);
      return fieldName;
    }
    if(mutationFunction.length == 2) {
      let [mutatedFieldName, mutatedValue] = mutationFunction(fieldName, this.jsonObj[fieldName]);
      this[mutatedFieldName] = mutatedValue;
      return mutatedFieldName;
    }
    return undefined;
  }

  toJSON() {
    return extractFieldsFromObj(this, this._memorized["JSONFields"]);
  }
}
