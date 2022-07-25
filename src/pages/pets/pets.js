import '../../js/burgerMenu.js';
import '../../js/pagination.js';
import petsData from '../../js/pets.js';
import PetCard from '../../js/PetCard.js';
import SliderModal from '../../js/SliderModal.js'
import {createPetArray} from '../../js/pagination.js';

window.onload = function() {
    renderContent(petsData)
}


const CONTENT = document.querySelector('.pets__content');

const createPetCards = (data) => {
    let cards = [];
    data.forEach((item) => {
      cards.push(new PetCard(item));
    });
    return cards;
  };

const renderContent = (data) => {
    let cards = createPetCards(data);
    let page = createPetArray(cards);
    for (let i = 0; i < page.length; i++) {
       page[i].forEach(elem => CONTENT.append(elem.generateCard()))
    addClickHandler(); 
    }
    
}

//modal

const addClickHandler = () => {
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