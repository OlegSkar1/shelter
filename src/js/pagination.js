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

// кол-во элементов на страницу
export const numOfElemsPerPage = 8;

// общее кол-во страниц
export const numOfButtons = (arr, num) => {
  return Math.ceil(arr.length / num);
};
