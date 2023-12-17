/**
 * @module RenderEngine
 * @author Anthony Tsang
 * @description A light weighted engine to render data dynamically.
 */

export default class RenderEngine {
  main() {throw new Error("Need implementation")}

  render() {
    const data = this.main();
    if (Array.isArray(data)) return this.renderMultiple(data);
    return this.renderOne(data);
  }
  
  renderOne(obj) {
    let element = document.createElement(obj.tag);
    if ("attr" in obj) this.setAttributes(element, obj.attr);
    if ("children" in obj) element.appendChild(this.renderMultiple(obj.children));
    return element;
  }
  
  renderMultiple(arr) {
    switch (arr.length) {
      case 0: return false;
      case 1: return this.renderOne(arr[0]);
      default:
        let fragment = new DocumentFragment;
        for (const item of arr) fragment.appendChild(this.renderOne(item));
        return fragment;
    }
  }

  setAttributes(element, attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      switch (key) {
        case "classList":
          element.classList.add(...value);
          break;
        case "dataset":
          Object.entries(value).forEach(([dataKey, dataValue]) => {
            element.dataset[dataKey] = dataValue;
          });
          break;
        case "text":
          element.textContent = value;
          break;
        default:
          element.setAttribute(key, value);
      }
    });
  }

  addWrapper(wrapper, arr) {
    wrapper.children = arr;
    return wrapper;
  }
}