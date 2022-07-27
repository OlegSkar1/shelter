import '../../js/burgerMenu.js';
import '../../js/pagination.js';
import petsData from '../../js/pets.js';
import PetCard from '../../js/PetCard.js';
import SliderModal from '../../js/SliderModal.js';
import {createPetArray, numOfButtons, numOfElemsPerPage} from '../../js/pagination.js';



const CONTENT = document.querySelector('.pets__content');
const NAVIGATION = document.querySelector('.navigation');
const BUTTON_FIRST = document.querySelector('#button_first');
const BUTTON_PREV = document.querySelector('#button_prev');
const BUTTON_ACTIVE = document.querySelector('#button_active');
const BUTTON_NEXT = document.querySelector('#button_next');
const BUTTON_LAST = document.querySelector('#button_last');

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
}
const resultArr = getResultPetArr(petsData); // сохранили полученные данные в переменную


const renderContent = (data) => {
      const result = data.map(elem => CONTENT.append(elem.generateCard())); // рендерим карточки на страницу
      addModalClickHandler(); 
      return result;
}

//modal

const addModalClickHandler = () => {
    CONTENT.addEventListener('click', (e) => {
      let card = e.target.closest('.pet-card');
      if (card) {
        let clickedCardId = card.getAttribute('data-id');
        let clickedCardData = getClickedData(clickedCardId);
  
        renderModalWindow(clickedCardData);
      }
    });
  };
  
  const renderModalWindow = (card) => {
    let modal = new SliderModal('modal', card);
    modal.renderModal();
  };
  
  const getClickedData = (id) => {
    return petsData.find((card) => card.id == id);
  };

  // обработка событий при клике на кнопку пагинации

  NAVIGATION.addEventListener('click', (e) => {
    let numOfAllPages = numOfButtons(resultArr, numOfElemsPerPage);
    let button = e.target;
    if (button.closest('.button__paginator')) {
      let currPage = +BUTTON_ACTIVE.textContent;
      let start;
      let end;
      if (button.closest('#button_next') && currPage < numOfAllPages) {
        currPage += 1;
        BUTTON_ACTIVE.textContent = currPage;
        start = numOfElemsPerPage * (currPage - 1);
        end = numOfElemsPerPage * currPage;
        CONTENT.innerHTML = '';
        renderCurrPage(start, end);
      } else if (button.closest('#button_last')) {
        BUTTON_ACTIVE.textContent = numOfAllPages;
        start = numOfElemsPerPage * (numOfAllPages - 1);
        CONTENT.innerHTML = '';
        renderCurrPage(start, end);
      }
    }
  })

  const renderCurrPage = (start, end) => {
    let slicedArr = resultArr.slice(start, end);
    renderContent(slicedArr);
  }

  window.onload = function() {
    renderCurrPage(0, numOfElemsPerPage);
    console.log(resultArr)
  }