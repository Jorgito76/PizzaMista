// Populate form with ingredient data
function populateIngredients(ingredients) {
  populateOptions('crust-options', 'crust', ingredients.crusts);
  populateOptions('sauce-options', 'sauce', ingredients.sauces);
  populateOptions('cheese-options', 'cheese', ingredients.cheeses);
  populateOptions('topping-options', 'toppings', ingredients.toppings, true);
}

function populateOptions(containerId, name, items, isCheckbox = false) {
  const container = document.getElementById(containerId);
  items.forEach(item => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = isCheckbox ? 'checkbox' : 'radio';
    input.name = name;
    input.value = item;
    label.appendChild(input);
    label.append(` ${item}`);
    container.appendChild(label);
    container.appendChild(document.createElement('br'));
  });
}

// Update price dynamically
function updatePrice() {
  const basePrice = 8;
  const toppingPrice = 0.5;
  const data = new FormData(document.getElementById('pizza-form'));
  const toppings = data.getAll('toppings');
  const total = basePrice + toppings.length * toppingPrice;
  document.getElementById('price-display').textContent = total.toFixed(2);
}

// Save pizza to localStorage
document.getElementById('save-btn').addEventListener('click', () => {
  const name = prompt("Name your pizza:");
  if (!name) return;

  const data = new FormData(document.getElementById('pizza-form'));

  // Basic validation
  if (!data.get('crust') || !data.get('sauce') || !data.get('cheese')) {
    alert("Please select a crust, sauce, and cheese before saving your pizza.");
    return;
  }

  const pizza = {
    crust: data.get('crust'),
    sauce: data.get('sauce'),
    cheese: data.get('cheese'),
    toppings: data.getAll('toppings')
  };

  savePizza(name, pizza);
  displaySavedPizzas();
});

// Load saved pizzas when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetch('data/ingredients.json')
    .then(response => response.json())
    .then(ingredients => {
      populateIngredients(ingredients);
    });

  document.getElementById('pizza-form').addEventListener('change', updatePrice);
  displaySavedPizzas();
  updatePrice();
});

// Print receipt
document.getElementById('print-btn').addEventListener('click', () => {
  const data = new FormData(document.getElementById('pizza-form'));

  document.getElementById('receipt-crust').textContent = data.get('crust');
  document.getElementById('receipt-sauce').textContent = data.get('sauce');
  document.getElementById('receipt-cheese').textContent = data.get('cheese');
  document.getElementById('receipt-toppings').textContent = data.getAll('toppings').join(', ');

  const toppingCount = data.getAll('toppings').length;
  const price = 8 + toppingCount * 0.5;
  document.getElementById('receipt-price').textContent = price.toFixed(2);

  const receipt = document.getElementById('receipt');
  receipt.style.display = 'block';
  window.print();
  receipt.style.display = 'none';
});


function loadPizzaToForm(pizza) {
  const form = document.getElementById('pizza-form');

  form.crust.value = pizza.crust;
  form.sauce.value = pizza.sauce;
  form.cheese.value = pizza.cheese;

  form.querySelectorAll('input[name="toppings"]').forEach(input => {
    input.checked = pizza.toppings.includes(input.value);
  });

  updatePrice();
}
