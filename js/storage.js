// Save a pizza object under a custom name
function savePizza(name, pizza) {
  const saved = loadSavedPizzas();
  saved[name] = pizza;
  localStorage.setItem('pizzas', JSON.stringify(saved));
}

// Load all saved pizzas from localStorage
function loadSavedPizzas() {
  const raw = localStorage.getItem('pizzas');
  return raw ? JSON.parse(raw) : {};
}

// Delete a pizza by name
function deletePizza(name) {
  const saved = loadSavedPizzas();
  delete saved[name];
  localStorage.setItem('pizzas', JSON.stringify(saved));
}

// Display saved pizzas in the UI
function displaySavedPizzas() {
  const saved = loadSavedPizzas();
  const container = document.getElementById('saved-pizzas');
  container.innerHTML = '';

  Object.entries(saved).forEach(([name, pizza]) => {
    const card = document.createElement('div');
    card.className = 'pizza-card';

    const title = document.createElement('h3');
    title.textContent = name;

    const loadBtn = document.createElement('button');
    loadBtn.textContent = 'Load';
    loadBtn.addEventListener('click', () => {
      loadPizzaToForm(pizza); // this function is in script.js
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      deletePizza(name);
      displaySavedPizzas();
    });

    card.appendChild(title);
    card.appendChild(loadBtn);
    card.appendChild(deleteBtn);
    container.appendChild(card);
  });
}
