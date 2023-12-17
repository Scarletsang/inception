/**
 * Get a live HTMLCollection from a search name. If a HTMLCollection is passed, then it will just return the same HTMLCollection.
 * @param {HTMLCollection | string} htmlCollectionOrSearchName 
 * @param {"ClassName" | "Name" | "TagName"} [type] 
 * @returns {HTMLCollection | undefined}
 */
export function getLiveHTMLCollection(htmlCollectionOrSearchName, type = "ClassName") {
  if (htmlCollectionOrSearchName instanceof HTMLCollection) return htmlCollectionOrSearchName;
  return document[`getElementsBy${type}`]?.(htmlCollectionOrSearchName);
}

/**
 * Get a live HTMLelement from a search name. If a HTMLElement is passed, then it will just return the same HTMLElement. If the type is any valid types other than "Id", it will return the first found element. 
 * @param {HTMLElement | string} htmlElementOrSearchName 
 * @param {"Id" | "ClassName" | "Name" | "TagName"} [type]
 * @returns {HTMLElement | undefined | null} undefined means the type is invalid, null means the search name is not found anywhere in the document.
 */
export function getLiveHTMLElement(htmlElementOrSearchName, type = "Id") {
  if (htmlElementOrSearchName instanceof HTMLElement) return htmlElementOrSearchName;
  if (type == "Id") return document.getElementById(htmlElementOrSearchName);
  const collection = document[`getElementsBy${type}`]?.(htmlElementOrSearchName);
  if (collection === undefined) return undefined;
  if (collection[0] === undefined) return null;
  return collection[0];
}

export function objectIsEmpty(obj) {
  for (const i in obj) return false;
  return true;
}

export function isString(obj) {return typeof obj === "string" || obj instanceof String;}

export function memorization(func) {
  const results = {};
  return (...args) => {
    const argsKey = JSON.stringify(args);
    if (!results[argsKey]) {
      results[argsKey] = func(...args);
    }
    return results[argsKey];
  };
}

export function addMemorizationTo(obj) {
  let mixin = {
    _memorized: {},
    memorize(key, value = undefined) {
      const result = this._memorized[key];
      if (result != undefined || value == undefined) return result;
      return (this._memorized[key] = value);
    },
    mutateMemorized(key, func) {
      return (this._memorized[key] = func(this._memorized[key]));
    }
  }
  return Object.assign(obj, mixin);
}

export function setToArray(set) {
  let arr = [];
  for (const item of set) {arr.push(item);}
  return arr;
}

export function extractFieldsFromObj(obj, fieldNames) {
  let result = {};
  for (const fieldName of fieldNames.values()) {
    result[fieldName] = obj[fieldName];
  }
  return result;
}

/**
 * Return a resize observor object that calls the given function on the the observed target whenever the target is resized.
 * @param {(entry: ResizeObserverEntry) => *} func
 * @returns {ResizeObserver}
 */
export function createResizeObserver(func) {
  return new ResizeObserver((entries) => {
    for (const entry of entries) {func(entry);}
  });
}

export function createMutationObserver(func) {
  return new MutationObserver((mutationList) => {
    for (const mutation of mutationList) {func(mutation);}
  });
}

export function dataContext(url, func) {
  fetchJSON(url)
  .then(data => func(data))
  .catch((err) => console.error(`can't load data. Received error when fetching ${url}:`, err));
}

export async function fetchJSON(path) {
	let response = await fetch(path);
  return response.json();
}