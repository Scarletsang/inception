/**
 * @module PopupRenderer
 * @author Anthony Tsang
 * @description A module that renders popup content when the element with one of the specified classes is clicked.
 */

import EventEngine from "event-engine";

export default function enablePopup(popupContainer, closePopupBtn, masonryGrid) {
  const popupEvent = new PopUpEvent("popup", popupContainer, ["click-more-btn"]);
  popupEvent.init();
  masonryGrid.addEventListener("click", (event) => {
    if (!popupEvent.hasSubscribed(event.target)) return ;
    let popupContent = event.target.parentElement.getElementsByClassName("idea-content")[0];
    let detail = popupContent.cloneNode(true);
    popupEvent.setDetail(detail).dispatch();
  }, true);
  closePopupBtn.addEventListener("click", (event) => {
    popupEvent.dispatch();
  });
}

class PopUpEvent extends EventEngine{
  eventHandler(event) {
    /** @type {HTMLElement} */
    let popupElement = event.target;
    if (popupElement.hasAttribute("popupActive")) {
      this.hidePopup(popupElement)
    }
    else {
      let contentContainer = popupElement.getElementsByClassName("popup-content")[0];
      contentContainer.replaceChildren(...event.detail.children);
      this.showPopup(popupElement);
    }
  }

  showPopup() {this.eventTarget.setAttribute("popupActive", "");}
  hidePopup() {this.eventTarget.removeAttribute("popupActive");}
}