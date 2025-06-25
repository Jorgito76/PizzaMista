// storage.js

const STORAGE_KEY = 'savedPizzas';

function savePizza(name, pizzaData) {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  saved[name] = pizzaData;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}

function loadSavedPizzas() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

function deletePizza(name) {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  delete saved[name];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}

function displaySavedPizzas() {
  const list = document.getElementById('favorites-list');
  list.innerHTML = '';
  const saved = loadSavedPizzas();

  for (const [name, pizza] of Object.entries(saved)) {
    const card = document.createElement('div');
    card.className = 'pizza-card';
    card.innerHTML = `
      <strong>${name}</strong>
      <p>Crust: ${pizza.crust}</p>
      <p>Sauce: ${pizza.sauce}</p>
      <p>Cheese: ${pizza.cheese}</p>
      <p>Toppings: ${pizza.toppings.join(', ')}</p>
      <button onclick="loadPizza('${name}')">Load</button>
      <button onclick="deleteAndRefresh('${name}')">Delete</button>
    `;
    list.appendChild(card);
  }
}

function loadPizza(name) {
  const saved = loadSavedPizzas();
  const pizza = saved[name];
  if (!pizza) return;

  // Populate the form with saved data
  document.querySelector(`input[name='crust'][value='${pizza.crust}']`).checked = true;
  document.querySelector(`input[name='sauce'][value='${pizza.sauce}']`).checked = true;
  document.querySelector(`input[name='cheese'][value='${pizza.cheese}']`).checked = true;

  document.querySelectorAll(`input[name='toppings']`).forEach(input => {
    input.checked = pizza.toppings.includes(input.value);
  });

  renderPizza(pizza);
  document.getElementById('price-display').textContent = `Price: $${(8 + pizza.toppings.length * 0.5).toFixed(2)}`;
}

function deleteAndRefresh(name) {
  deletePizza(name);
  displaySavedPizzas();
}
