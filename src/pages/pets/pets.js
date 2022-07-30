import "../../js/burgerMenu.js";
import "../../js/pagination.js";
import petsData from "../../js/pets.js";
import PetCard from "../../js/PetCard.js";
import SliderModal from "../../js/SliderModal.js";
import {
  createPetArray,
  numOfButtons,
  numOfElemsPerPage,
} from "../../js/pagination.js";

const CONTENT = document.querySelector(".pets__content");
const NAVIGATION = document.querySelector(".navigation");
const BUTTON_FIRST = document.querySelector("#button_first");
const BUTTON_PREV = document.querySelector("#button_prev");
const BUTTON_ACTIVE = document.querySelector("#button_active");
const BUTTON_NEXT = document.querySelector("#button_next");
const BUTTON_LAST = document.querySelector("#button_last");

const createPetCards = (data) => {
  let cards = [];
  data.forEach((item) => {
    cards.push(new PetCard(item));
  });
  return cards;
};

const getResultPetArr = (data) => {
  let cards = createPetCards(data); // создаем массив карточек из petsData
  let page = createPetArray(cards); // размноживаем массив до 48 элементов в псевдо-случайном порядке
  let resultArr = [];
  for (let i = 0; i < page.length; i++) {
    resultArr.push(...page[i]); // разворачиваем массивы карточек в результирующий массив
  }
  return resultArr;
};
const resultArr = getResultPetArr(petsData); // сохранили полученные данные в переменную

//modal

const addModalClickHandler = () => {
  CONTENT.addEventListener("click", (e) => {
    let card = e.target.closest(".pet-card");
    if (card) {
      let clickedCardId = card.getAttribute("data-id");
      let clickedCardData = getClickedData(clickedCardId);
      renderModalWindow(clickedCardData);
    }
  });
};

const getClickedData = (id) => {
  return petsData.find((card) => card.id == id);
};

const renderModalWindow = (card) => {
  let modal = new SliderModal("modal", card);
  modal.renderModal();
};

// обработка событий при клике на кнопку пагинации

const renderContent = (data) => {
  data.map((elem) => CONTENT.append(elem.generateCard())); // рендерим карточки на страницу
};

// из массива resultArr берем slice, который соответсвует странице
const renderCurrPage = (start, end) => {
  let slicedArr = resultArr.slice(start, end);
  renderContent(slicedArr);
  return slicedArr;
};

// функция пагинации
const renderPagination = (e) => {
  let numOfAllPages = numOfButtons(resultArr, numOfElemsPerPage());
  let button = e.target;
  let currPage = +BUTTON_ACTIVE.textContent;

  if (button.closest("#button_next") && currPage < numOfAllPages) {
    currPage += 1;
    getPage(currPage, numOfAllPages);
    NAVIGATION.removeEventListener("click", renderPagination);
  }
  if (button.closest("#button_last") && currPage < numOfAllPages) {
    currPage = numOfAllPages;
    getPage(currPage, numOfAllPages);
    NAVIGATION.removeEventListener("click", renderPagination);
  }
  if (button.closest("#button_prev") && currPage > 1) {
    currPage -= 1;
    getPage(currPage, numOfAllPages);
    NAVIGATION.removeEventListener("click", renderPagination);
  }
  if (button.closest("#button_first") && currPage > 1) {
    currPage = 1;
    getPage(currPage, numOfAllPages);
    NAVIGATION.removeEventListener("click", renderPagination);
  }
};

// изменяем номер страницы при клике и рендерим ту часть массива resultArr, которая соответствует номеру страницы
const getPage = (page, numOfAllPages) => {
  BUTTON_ACTIVE.innerHTML = `<span>${page}</span>`;
  let start = numOfElemsPerPage() * (page - 1);
  let end = numOfElemsPerPage() * page;
  CONTENT.innerHTML = "";

  changeButtonsClass(page, numOfAllPages);
  renderCurrPage(start, end);
};

// изменяем состояние при нажатии кнопок пагинации
const changeButtonsClass = (currPage, numOfAllPages) => {
  if (currPage > 1 && currPage < numOfAllPages) {
    BUTTON_FIRST.classList.remove("button_inactive");
    BUTTON_PREV.classList.remove("button_inactive");
    BUTTON_LAST.classList.remove("button_inactive");
    BUTTON_NEXT.classList.remove("button_inactive");
  }
  if (currPage == numOfAllPages) {
    BUTTON_FIRST.classList.remove("button_inactive");
    BUTTON_PREV.classList.remove("button_inactive");
    BUTTON_LAST.classList.add("button_inactive");
    BUTTON_NEXT.classList.add("button_inactive");
  }
  if (currPage == 1) {
    BUTTON_FIRST.classList.add("button_inactive");
    BUTTON_PREV.classList.add("button_inactive");
    BUTTON_LAST.classList.remove("button_inactive");
    BUTTON_NEXT.classList.remove("button_inactive");
  }
};

NAVIGATION.addEventListener("click", renderPagination);
CONTENT.addEventListener("animationend", () =>
  NAVIGATION.addEventListener("click", renderPagination)
);

window.onload = function () {
  renderCurrPage(0, numOfElemsPerPage()); // потрисовываем первый slice
  addModalClickHandler(); // на каждую карточку вешаем событие, по клику открывается модалка
};
