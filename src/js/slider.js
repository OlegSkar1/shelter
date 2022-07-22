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

// создаем ноды из массива объектов питомцев
const createPetCards = (data) => {
  let cards = [];
  data.forEach((item) => {
    cards.push(new PetCard(item));
  });
  return cards;
};

// генерируем массив из 3х случайных уникальных индексов
const generateRandomArray = (data) => {
  let setCard = new Set();
  while (setCard.size < 3) {
    let randomId = Math.floor(Math.random() * data.length) + 1; // случайный Id от 1 до max включая границы
    setCard.add(randomId);
  }
  return [...setCard];
};

// Рендерим те карточки, data-id которых совпадают с setCard
const renderFiltredCards = (data, item) => {
  item.innerHTML = "";
  let randomArr = generateRandomArray(data);

  // создаем ноды из массива объектов питомцев
  const petCards = createPetCards(data);

  let filtredCards = petCards.filter((card) => randomArr.includes(card.id));

  filtredCards.forEach((card) => {
    item.append(card.generateCard());
  });
};

// генерируем ITEM_ACTIVE из случайных карточек
const generateActiveContainer = (data) => {
  renderFiltredCards(data, ITEM_ACTIVE);
};

//генерируем ITEM_LEFT из случайных карточек
const generateLeftContainer = (data) => {
  renderFiltredCards(data, ITEM_LEFT); // создаем ITEM_LEFT

  const activeCards = document.querySelectorAll("#container-active .pet-card");
  const leftCards = document.querySelectorAll("#container-left .pet-card");

  // получаем массивы data-id
  let activeCardId = Array.from(activeCards).map((card) => +card.dataset.id);
  let leftCardId = Array.from(leftCards).map((card) => +card.dataset.id);

  // получаем результирующий массив и оставляем уникальные data-id
  let resultCardId = [...activeCardId, ...leftCardId];
  let uniqCardId = new Set(resultCardId);
  console.log(resultCardId);
  console.log(uniqCardId);

  //если были удалены повторяющиеся числа, то наполняем Set до 6
  while (uniqCardId.size < 6) {
    let randomId = Math.floor(Math.random() * data.length) + 1; // случайный Id от 1 до max включая границы
    uniqCardId.add(randomId);
  }
  console.log([...uniqCardId]);

  // получаем уникальный массив для leftCards
  const uniqLeftCardId = [...uniqCardId].slice(3);
  console.log(uniqLeftCardId);

  //рендерим leftContainer с уникальными карточками
  ITEM_LEFT.innerHTML = "";
  const petCards = createPetCards(data);

  let filtredCards = petCards.filter((card) =>
    uniqLeftCardId.includes(card.id)
  );

  filtredCards.forEach((card) => {
    ITEM_LEFT.append(card.generateCard());
  });
};

window.onload = function () {
  // ITEM_RIGHT.innerHTML = '';
  generateActiveContainer(petsData);
  generateLeftContainer(petsData);
};
