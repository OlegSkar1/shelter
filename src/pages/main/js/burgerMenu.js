// Burger menu
const burger = document.querySelector(".burger");
const header = document.querySelector(".header");
const headerWrapper = document.querySelector(".header__wrapper");
const headerLogo = document.querySelector(".header__logo");
const headerNav = document.querySelector(".header__nav");
const body = document.body;
const navLinks = headerNav.querySelectorAll(".header__nav>a");

const activeLink = () => {
  navLinks.forEach((link) => {
    if (link.classList.contains("active")) {
      link.classList.remove("active");
    }
  });
};

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("header__link")) {
    return;
  }
  if (!e.target.classList.contains("active")) {
    activeLink();
    e.target.classList.add("active");
    burgerToggle();
  } else {
    burgerToggle();
  }
});

// open/close burger menu
const burgerToggle = () => {
  burger.classList.toggle("active"); //поворачивает burger button
  header.classList.toggle("header_active");
  headerNav.classList.toggle("active"); // открывает\закрывает burger menu
  body.classList.toggle("lock"); // отмена скрола

  if (headerLogo.parentElement != headerNav) {
    // перемещаем лого внутрь burger menu
    headerNav.prepend(headerLogo);
  } else {
    headerWrapper.prepend(headerLogo);
  }
};

burger.addEventListener("click", burgerToggle);

document.addEventListener("click", (e) => {
  // закрываем по нажатию вне berger menu
  if (e.target.classList.contains("lock")) {
    burgerToggle();
  }
});
