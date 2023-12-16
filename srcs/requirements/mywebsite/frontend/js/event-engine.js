/**
 * @module EventEngine
 * @author Anthony Tsang
 * @desciption A wrapper to make event on an element much more managable to deal with.
 */

export default class EventEngine {
  constructor(eventName, eventTarget, subscribtionClasses) {
    this.eventName = eventName;
    this.eventTarget = eventTarget;
    this.subscribtionClasses = subscribtionClasses;
  }

  hasSubscribed(element) {
    for (const className of this.subscribtionClasses) {
      if (element.classList.contains(className)) return true;
    }
    return false;
  }

  setDetail(detail) { this.detail = detail; return this;}

  init() {
    this.eventTarget.addEventListener(this.eventName, this.eventHandler.bind(this));
    return this;
  }

  dispatch() {
    this.eventTarget.dispatchEvent(this.createEventObject());
    return this;
  }

  eventHandler() {throw Error("Need implementation.")}

  createEventObject() {
    return new CustomEvent(this.eventName, {detail: this.detail});
  }
}