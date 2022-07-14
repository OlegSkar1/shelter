// Burger menu
const burger = document.querySelector('.burger');
const headerNav = document.querySelector('.header__nav');
let logo;

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  headerNav.classList.toggle('active');

  if (burger.classList.contains('active')) {
    logo = document.createElement('div');
    logo.className = 'header__logo';
    logo.innerHTML = `<a href="#!">
    <h1>Cozy House</h1>
    <p>Shelter for pets in Boston</p>
  </a>`;
    headerNav.prepend(logo);
  } else {
    logo.remove();
  }
});
