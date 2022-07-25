import petsData from './pets.js';
import PetCard from './PetCard.js';
import { Modal } from './Modal.js';
import { SliderModal } from './SliderModal.js';

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
  if (animation.animationName === 'move-left') {
    CAROUSEL.classList.remove('transition-left');
    ITEM_RIGHT.innerHTML = ITEM_ACTIVE.innerHTML; // переписываем элементы центра на правую позицию
    ITEM_ACTIVE.innerHTML = ITEM_LEFT.innerHTML; // переписываем элементы слева на центральную позицию
    generateLeftContainer(petsData);
  } else {
    CAROUSEL.classList.remove('transition-right');
    ITEM_LEFT.innerHTML = ITEM_ACTIVE.innerHTML;
    ITEM_ACTIVE.innerHTML = ITEM_RIGHT.innerHTML;
    generateRightContainer(petsData);
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

// генерируем массив из случайных уникальных индексов
const generateRandomArray = (data) => {
  let setCard = new Set();
  let count;
  if (document.body.clientWidth >= 1280) count = 3;
  else if (document.body.clientWidth >= 768) count = 2;
  else count = 1;
  while (setCard.size < count) {
    let randomId = Math.floor(Math.random() * data.length) + 1; // случайный Id от 1 до max включая границы
    setCard.add(randomId);
  }
  return [...setCard];
};

// Рендерим те карточки, data-id которых совпадают с generateRandomArray
const renderFiltredCards = (data, item) => {
  item.innerHTML = '';
  let randomArr = generateRandomArray(data);

  // создаем ноды из массива объектов питомцев
  const petCards = createPetCards(data);

  let filtredCards = petCards.filter((card) => randomArr.includes(card.id));

  filtredCards.forEach((card) => {
    item.append(card.generateCard());
  });
};

// генерируем для right/left container уникальные data-id, отличные от active container
const uniqCardId = (active, current, data) => {
  let resultCardId = [...active, ...current];
  let uniqCardId = new Set(resultCardId);

  //если были удалены повторяющиеся числа, то наполняем Set
  while (uniqCardId.size < resultCardId.length) {
    let randomId = Math.floor(Math.random() * data.length) + 1; // случайный Id от 1 до max включая границы
    uniqCardId.add(randomId);
  }

  // получаем уникальный массив
  let count;
  if (document.body.clientWidth >= 1280) count = 3;
  else if (document.body.clientWidth >= 768) count = 2;
  else count = 1;
  return [...uniqCardId].slice(count);
};

// генерируем ITEM_ACTIVE из случайных карточек
const generateActiveContainer = (data) => {
  renderFiltredCards(data, ITEM_ACTIVE);
  addSliderClickHandler();
};

//генерируем ITEM_LEFT из случайных карточек
const generateLeftContainer = (data) => {
  renderFiltredCards(data, ITEM_LEFT); // создаем ITEM_LEFT

  const activeCards = document.querySelectorAll('#container-active .pet-card');
  const leftCards = document.querySelectorAll('#container-left .pet-card');

  // получаем массивы data-id
  let activeCardId = Array.from(activeCards).map((card) => +card.dataset.id);
  let leftCardId = Array.from(leftCards).map((card) => +card.dataset.id);

  // получаем результирующий массив и оставляем уникальные data-id

  let uniqCard = uniqCardId(activeCardId, leftCardId, data);

  //рендерим leftContainer с уникальными карточками
  ITEM_LEFT.innerHTML = '';
  const petCards = createPetCards(data);

  let filtredCards = petCards.filter((card) => uniqCard.includes(card.id));

  filtredCards.forEach((card) => {
    ITEM_LEFT.append(card.generateCard());
  });
};

//генерируем ITEM_RIGHT из случайных карточек
const generateRightContainer = (data) => {
  renderFiltredCards(data, ITEM_RIGHT); // создаем ITEM_RIGHT

  const activeCards = document.querySelectorAll('#container-active .pet-card');
  const rightCards = document.querySelectorAll('#container-right .pet-card');

  // получаем массивы data-id
  let activeCardId = Array.from(activeCards).map((card) => +card.dataset.id);
  let rightCardId = Array.from(rightCards).map((card) => +card.dataset.id);

  // получаем результирующий массив и оставляем уникальные data-id

  let uniqCard = uniqCardId(activeCardId, rightCardId, data);

  //рендерим leftContainer с уникальными карточками
  ITEM_RIGHT.innerHTML = '';
  const petCards = createPetCards(data);

  let filtredCards = petCards.filter((card) => uniqCard.includes(card.id));

  filtredCards.forEach((card) => {
    ITEM_RIGHT.append(card.generateCard());
  });
};

window.onload = function () {
  generateActiveContainer(petsData);
  generateLeftContainer(petsData);
  generateRightContainer(petsData);

  //generate base modal
  addToolsClickHandler();
};

const addToolsClickHandler = () => {
  document.querySelector('.donation__card').addEventListener('click', () => {
    generateToolsModal();
  });
};

const addSliderClickHandler = () => {
  ITEM_ACTIVE.addEventListener('click', (e) => {
    let card = e.target.closest('.pet-card');
    if (card) {
      let clickedCardId = card.getAttribute('data-id');
      let clickedCardData = getClickedData(clickedCardId);

      renderSliderModalWindow(clickedCardData);
    }
  });
};

const generateToolsModal = () => {
  renderModalWindow('test content for tools modal');
};

const renderModalWindow = (content) => {
  let modal = new Modal('modal');
  modal.buildModal(content);
};

const renderSliderModalWindow = (card) => {
  let modal = new SliderModal('modal', card);
  modal.renderModal();
};

const getClickedData = (id) => {
  return petsData.find((card) => card.id == id);
};
