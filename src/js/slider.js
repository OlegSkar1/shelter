import petsData from "./pets.js";
import PetCard from "./PetCard.js";

const BTN_LEFT = document.querySelector("#btn-left");
const BTN_RIGHT = document.querySelector("#btn-right");
const CAROUSEL = document.querySelector("#pets-carousel");
const ITEM_ACTIVE = document.querySelector("#container-active");
const ITEM_LEFT = document.querySelector("#container-left");
const ITEM_RIGHT = document.querySelector("#container-right");

// перелистывание влево
const moveLeft = () => {
  CAROUSEL.classList.add("transition-left");
  BTN_LEFT.removeEventListener("click", moveLeft); // запрещаем перелистывать пока не закончится анимация
  BTN_RIGHT.removeEventListener("click", moveRight);
};

// перелистывание вправо
const moveRight = () => {
  CAROUSEL.classList.add("transition-right");
  BTN_RIGHT.removeEventListener("click", moveRight);
  BTN_LEFT.removeEventListener("click", moveLeft);
};

BTN_RIGHT.addEventListener("click", moveRight);
BTN_LEFT.addEventListener("click", moveLeft);

CAROUSEL.addEventListener("animationend", (animation) => {
  let changedItems;
  if (animation.animationName === "move-left") {
    changedItems = ITEM_LEFT;
    CAROUSEL.classList.remove("transition-left");
    ITEM_ACTIVE.innerHTML = ITEM_LEFT.innerHTML; // переписываем элементы слева на центральную позицию
  } else {
    CAROUSEL.classList.remove("transition-right");
    changedItems = ITEM_RIGHT;
    ITEM_ACTIVE.innerHTML = ITEM_RIGHT.innerHTML;
  }

  BTN_RIGHT.addEventListener("click", moveRight);
  BTN_LEFT.addEventListener("click", moveLeft);
});

const createPetCards = (data) => {
  let cards = [];
  data.forEach((item) => {
    cards.push(new PetCard(item));
  });
  return cards;
};

const getRandomId = (max) => {
  return Math.floor(Math.random() * max);
};

window.onload = function () {
  ITEM_RIGHT.innerHTML = "";
  ITEM_ACTIVE.innerHTML = "";
  ITEM_LEFT.innerHTML = "";
  generateLeftContainer(petsData);
};

const generateLeftContainer = (data) => {
  let setCard = new Set();
  while (setCard.size < 3) {
    let randomId = getRandomId(data.length);
    // const cards = createPetCards(data);
    // const card = cards[randomId];
    setCard.add(randomId);
  }
  console.log(setCard);
  for (let randomId of setCard) {
    createPetCards(petsData);
    let cards = createPetCards(petsData).generateCard();
    console.log(cards);
    // item.innerHTML = item.generateCard();
    // console.log((item.innerHTML = item.generateCard()));
    // ITEM_LEFT.append(item);
  }
  ITEM_RIGHT.append(card);
};
