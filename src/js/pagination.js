import petsData from '../js/pets.js';

// создаем массив из 48 питомцев в псевдо-случайном порядке
function mixarr(arr) {
  return arr
    .map((i) => [Math.random(), i])
    .sort()
    .map((i) => i[1]);
}
export const createPetArray = (data) => {
  let result = [];

  for (let i = 0; i < 6; i++) {
    result.push(mixarr(data));
  }
  return result;
};
