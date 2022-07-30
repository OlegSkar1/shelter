// Burger menu
const burger = document.querySelector(".burger");
const header = document.querySelector(".header");
const headerWrapper = document.querySelector(".header__wrapper");
const headerLogo = document.querySelector(".header__logo");
const headerNav = document.querySelector(".header__nav");
const body = document.body;
const navLinks = document.querySelectorAll(".header__link");

const removeActiveLink = () => {
  navLinks.forEach((link) => {
    if (link.classList.contains("active")) {
      link.classList.remove("active");
    }
  });
};

headerNav.addEventListener("click", (e) => {
  if (!e.target.classList.contains("header__link")) {
    return;
  } else if (!e.target.classList.contains("active")) {
    removeActiveLink();
    e.target.classList.add("active");
    burgerToggle();
  } else {
    burgerToggle();
  }
});

// open/close burger menu
const burgerToggle = () => {
  if (body.clientWidth < 768) {
    burger.classList.toggle("active"); //поворачивает burger button
    header.classList.toggle("header_active"); // меняем позиционирование header
    headerNav.classList.toggle("active"); // открывает\закрывает burger menu
    headerWrapper.classList.toggle("active");
    body.classList.toggle("lock"); // отмена скрола

    if (headerLogo.parentElement != headerNav) {
      // перемещаем лого внутрь burger menu
      headerNav.prepend(headerLogo);
    } else {
      headerWrapper.prepend(headerLogo);
    }
  } else return;
};

burger.addEventListener("click", burgerToggle);

document.addEventListener("click", (e) => {
  // закрываем по нажатию вне berger menu
  if (e.target.classList.contains("lock")) {
    burgerToggle();
  }
});
