import close from '../assets/svg/close.svg';

export class Modal {
  constructor(classes) {
    this.classes = classes;
    this.modal = '';
    this.modalWrapper = '';
    this.modalCloseBtn = '';
  }

  buildModal(content) {
    //Modal
    this.modal = this.createDomNode(this.modal, 'div', 'modal', this.classes);

    //Wrapper
    this.modalWrapper = this.createDomNode(this.modalWrapper, 'div', 'modal__wrapper');

    //CloseBtn
    this.modalCloseBtn = this.createDomNode(this.modalCloseBtn, 'button', 'button__sircle', 'modal__close-btn');
    this.modalCloseBtn.innerHTML = `<img src="${close}">`;

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
    if (typeof content === 'string') {
      this.modalWrapper.innerHTML = content;
    } else {
      this.modalWrapper.innerHTML = '';
      this.modalWrapper.append(content);
    }
  }

  appendModalElements() {
    this.modal.append(this.modalWrapper);
    this.modalWrapper.append(this.modalCloseBtn);
  }

  bindEvents() {
    this.modalCloseBtn.addEventListener('click', this.closeModal);
    document.body.addEventListener('click', this.closeModal);
    document.body.addEventListener('mouseover', this.hoverCloseButton);
  }

  openModal() {
    document.body.append(this.modal);
    document.body.classList.add('lock');
    document.querySelector('.header').style.opacity = '0';
    document.querySelector('.header').style.zIndex = '0';
  }

  closeModal(e) {
    let classes = e.target.classList;
    if (classes.contains('lock') || e.target.closest('.modal__close-btn')) {
      document.querySelector('.modal').remove();
      document.body.classList.remove('lock');
      document.querySelector('.header').style.opacity = '1';
      document.querySelector('.header').style.zIndex = '1';
      e.stopPropagation();
    }
  }

  hoverCloseButton(e) {
    let classes = e.target.classList;
    if (classes.contains('lock')) {
      document.querySelector('.modal__close-btn').classList.add('active-btn');
    }
    if (document.querySelector('.modal') && !classes.contains('lock')) {
      document.querySelector('.modal__close-btn').classList.remove('active-btn');
    }
  }
}
