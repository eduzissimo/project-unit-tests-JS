/* eslint-disable max-len */
// Siga as orientações do README!

function createMenu(menu) {
  const consumption = [];

  function order(item) {
    if (Object.prototype.hasOwnProperty.call(menu.food, item) 
        || Object.prototype.hasOwnProperty.call(menu.drinks, item)) {
      consumption.push(item);
    } else {
      return 'Item indisponível';
    }
  }

  function pay() {
    let total = 0;
    consumption.forEach((item) => {
      if (Object.prototype.hasOwnProperty.call(menu.food, item)) {
        total += menu.food[item];
      } else if (Object.prototype.hasOwnProperty.call(menu.drinks, item)) {
        total += menu.drinks[item];
      }
    });
    return total;
  }

  return {
    fetchMenu() {
      return menu;
    },
    order,
    consumption,
    pay,
  };
}

module.exports = createMenu;