import { Modal } from "./Modal.js";

export class SliderModal extends Modal {
  constructor(
    classes,
    {
      id,
      name,
      img,
      type,
      breed,
      description,
      age,
      inoculations,
      diseases,
      parasites,
    }
  ) {
    super(classes);
    // this.petImg = "";
    // this.card = "";
    this.id = id;
    this.name = name;
    this.img = img;
    this.type = type;
    this.breed = breed;
    this.description = description;
    this.age = age;
    this.inoculations = inoculations;
    this.diseases = diseases;
    this.parasites = parasites;
  }

  // PetCard window modal generator
  generateCard() {
    let card = super.createDomNode(this.card, "div", "modal__content");
    let template = "";
    template += `
    <h3>${this.name}</h3>
    <h4>${this.type} - ${this.breed}</h4>
    <p>${this.description}</p>
    <ul class="modal__list">
        <li class="list-item"><strong>Age:</strong> ${this.age}</li>
        <li class="list-item"><strong>Inoculations:</strong> ${this.inoculations}</li>
        <li class="list-item"><strong>Diseases:</strong> ${this.diseases}</li>
        <li class="list-item"><strong>Parasites:</strong> ${this.parasites}</li>
    </ul>
     `;

    card.innerHTML = template;
    return card;
  }

  renderModal() {
    let petImg = super.createDomNode(this.petImg, "img", "modal__img");
    petImg.src = `${this.img}`;
    petImg.setAttribute("alt", "pets");
    let content = this.generateCard();

    super.buildModal(content);
    content.insertAdjacentElement("beforebegin", petImg);
  }
}
