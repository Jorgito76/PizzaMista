function populateIngredients(ingredients) {
  populateOptions('crust-options', 'crust', ingredients.crusts);
  populateOptions('sauce-options', 'sauce', ingredients.sauces);
  populateOptions('cheese-options', 'cheese', ingredients.cheeses);
  populateOptions('topping-options', 'toppings', ingredients.toppings, true);
}

function populateOptions(containerId, name, items, isCheckbox = false) {
  const container = document.getElementById(containerId);
  items.forEach((item, index) => {
    const inputId = `${name}-${index}`;
    const label = document.createElement('label');
    label.setAttribute('for', inputId);

    const input = document.createElement('input');
    input.type = isCheckbox ? 'checkbox' : 'radio';
    input.name = name;
    input.value = item;
    input.id = inputId;

    label.appendChild(input);
    label.append(` ${item}`);
    container.appendChild(label);
    container.appendChild(document.createElement('br'));
  });
}

function updatePrice() {
  const basePrice = 8;
  const toppingPrice = 0.5;
  const data = new FormData(document.getElementById('pizza-form'));
  const toppings = data.getAll('toppings');
  const total = basePrice + toppings.length * toppingPrice;
  document.getElementById('price-display').textContent = total.toFixed(2);
}

function loadPizzaToForm(pizza) {
  if (!pizza || !pizza.crust || !pizza.sauce || !pizza.cheese) {
    alert("This saved pizza is missing some data.");
    return;
  }
  const form = document.getElementById('pizza-form');
  form.crust.value = pizza.crust;
  form.sauce.value = pizza.sauce;
  form.cheese.value = pizza.cheese;
  form.querySelectorAll('input[name="toppings"]').forEach(input => {
    input.checked = pizza.toppings.includes(input.value);
  });
  updatePrice();
  updatePreview();
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

document.getElementById('save-btn').addEventListener('click', () => {
  const name = prompt("Name your pizza:");
  if (!name) return;
  const data = new FormData(document.getElementById('pizza-form'));
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
  showToast("Pizza saved!");
});

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

document.addEventListener('DOMContentLoaded', () => {
  fetch('data/ingredients.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load ingredients.');
      return response.json();
    })
    .then(ingredients => {
      populateIngredients(ingredients);
    })
    .catch(error => {
      console.error('Error loading ingredients:', error);
      document.body.innerHTML = `
        <h1>Oops!</h1>
        <p>We couldn't load the pizza ingredients. Please try refreshing or check the JSON file.</p>
      `;
    });

  document.getElementById('pizza-form').addEventListener('change', () => {
    updatePrice();
    updatePreview();
  });
  displaySavedPizzas();
  updatePrice();
  updatePreview();
});