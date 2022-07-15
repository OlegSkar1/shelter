// Burger menu
const burger = document.querySelector(".burger");
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

headerNav.addEventListener("click", (e) => {
  if (!e.target.classList.contains("header__link")) {
    return;
  } else {
    if (!e.target.classList.contains("active")) {
      activeLink();
      e.target.classList.add("active");
      burgerToggle();
    } else {
      burgerToggle();
    }
  }
});

// navLinks.forEach((link) => {
//   link.addEventListener("click", (e) => {
//     if (e.target.classList.contains("active")) {
//       return;
//     }
//     e.target.classList.add("active");
//   });
// });
const burgerToggle = () => {
  burger.classList.toggle("active");
  headerNav.classList.toggle("active");
  body.classList.toggle("lock");
};

burger.addEventListener("click", burgerToggle);
