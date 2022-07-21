import petsData from './pets.js';
import PetCard from './PetCard.js';

const BTN_LEFT = document.querySelector('#btn-left');
const BTN_RIGHT = document.querySelector('#btn-right');
const CAROUSEL = document.querySelector('#pets-carousel');
const ITEM_ACTIVE = document.querySelector('#container-active');
const ITEM_LEFT = document.querySelector('#container-left');
const ITEM_RIGHT = document.querySelector('#container-right');

// перелистывание влево
const moveLeft = () => {
  CAROUSEL.classList.add('transition-left');
  BTN_LEFT.removeEventListener('click', moveLeft); // запрещаем перелистывать пока не закончится анимация
  BTN_RIGHT.removeEventListener('click', moveRight);
};

// перелистывание вправо
const moveRight = () => {
  CAROUSEL.classList.add('transition-right');
  BTN_RIGHT.removeEventListener('click', moveRight);
  BTN_LEFT.removeEventListener('click', moveLeft);
};

BTN_RIGHT.addEventListener('click', moveRight);
BTN_LEFT.addEventListener('click', moveLeft);

CAROUSEL.addEventListener('animationend', (animation) => {
  let changedItems;
  if (animation.animationName === 'move-left') {
    changedItems = ITEM_LEFT;
    CAROUSEL.classList.remove('transition-left');
    ITEM_ACTIVE.innerHTML = ITEM_LEFT.innerHTML; // переписываем элементы слева на центральную позицию
  } else {
    CAROUSEL.classList.remove('transition-right');
    changedItems = ITEM_RIGHT;
    ITEM_ACTIVE.innerHTML = ITEM_RIGHT.innerHTML;
  }

  BTN_RIGHT.addEventListener('click', moveRight);
  BTN_LEFT.addEventListener('click', moveLeft);
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

// генерируем ITEM_ACTIVE из случайных карточек
const generateActiveContainer = (data) => {
  let activeWrapper = getActiveWrapper();
  let randomArr = generateRandomArray(data);

  // создаем ноды из массива объектов питомцев
  const petCards = createPetCards(data);

  // Рендерим те карточки, data-id которых совпадают с setCard
  let filtredCards = petCards.filter((card) => randomArr.includes(card.id));
  filtredCards.forEach((card) => {
    activeWrapper.append(card.generateCard());
  });
};

//генерируем ITEM_LEFT из случайных карточек
const generateLeftContainer = (data) => {
  // let leftWrapper = getLeftWrapper();
  let randomArr = generateRandomArray(data);

  // создаем ноды из массива объектов питомцев
  const petCards = createPetCards(data);

  const activeCards = document.querySelectorAll('#container-active .pet-card');

  // сделать проверку если в activeCards есть randomArr, то генерировать leftContainer заново
};

window.onload = function () {
  // ITEM_RIGHT.innerHTML = '';
  // ITEM_LEFT.innerHTML = '';
  generateActiveContainer(petsData);
  generateLeftContainer(petsData);
};

const getActiveWrapper = () => {
  ITEM_ACTIVE.innerHTML = '';
  return ITEM_ACTIVE;
};

const getLeftWrapper = () => {
  ITEM_LEFT.innerHTML = '';
  return ITEM_LEFT;
};
