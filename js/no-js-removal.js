'use strict';    

// Удаление класса модификатора --no-js:
document.querySelectorAll('*[class$="no-js"]').forEach(function (item) {
  // item.classList.remove('*[class$="no-js"]');
  item.classList.remove(item.classList[item.classList.length - 1]);
  console.log(item);
});
