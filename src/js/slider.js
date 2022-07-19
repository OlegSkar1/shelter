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
