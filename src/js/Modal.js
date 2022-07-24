export class Modal {
  constructor(classes) {
    this.classes = classes;
    this.modal = "";
    this.modalWrapper = "";
    this.modalCloseBtn = "";
  }

  buildModal(content) {
    //Modal
    this.modal = this.createDomNode(this.modal, "div", "modal", this.classes);

    //Wrapper
    this.modalWrapper = this.createDomNode(
      this.modalWrapper,
      "div",
      "modal__wrapper"
    );

    //CloseBtn
    this.modalCloseBtn = this.createDomNode(
      this.modalCloseBtn,
      "button",
      "button__sircle",
      "modal__close-btn"
    );
    this.modalCloseBtn.innerHTML =
      '<img src="/src/assets/svg/close.svg" alt="close">';

    this.setContent(content);

    this.appendModalElements();

    this.bindEvents();

    this.openModal();
  }

  createDomNode(node, element, ...classes) {
    node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }

  setContent(content) {
    if (typeof content === "string") {
      this.modalWrapper.innerHTML = content;
    } else {
      this.modalWrapper.innerHTML = "";
      this.modalWrapper.append(content);
    }
  }

  appendModalElements() {
    this.modal.append(this.modalWrapper);
    this.modalWrapper.append(this.modalCloseBtn);
  }

  bindEvents() {
    this.modalCloseBtn.addEventListener("click", this.closeModal);
    document.body.addEventListener("click", this.closeModal);
  }

  openModal() {
    document.body.append(this.modal);
    document.body.classList.add("lock");
  }

  closeModal(e) {
    let classes = e.target.classList;
    if (classes.contains("lock") || classes.contains("modal__close-btn")) {
      document.querySelector(".modal.tools-modal").remove();
      document.body.classList.remove("lock");
      e.stopPropagation();
    }
  }
}
