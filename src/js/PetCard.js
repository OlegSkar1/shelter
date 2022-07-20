class PetCard {
  constructor({ id, name, img, ...rest }) {
    this.id = id;
    this.name = name;
    this.img = img;
  }

  // PetCard generator
  generateCard() {
    let template = "";
    let card = document.createElement("div");
    card.className = "pet-card";
    card.setAttribute("data-id", this.id);

    template += `<img src="${this.img}" alt="pet" class="pets__img">
    <p>${this.name}</p>
    <button class="button button__more">Learn more</button> `;

    card.innerHTML = template;
    return card;
  }
}

export default PetCard;
