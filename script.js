// script.js

document.addEventListener('DOMContentLoaded', () => {
  fetch('data/ingredients.json')
    .then(res => res.json())
    .then(data => {
      populateOptions('crust-options', data.crusts, 'crust');
      populateOptions('sauce-options', data.sauces, 'sauce');
      populateOptions('cheese-options', data.cheeses, 'cheese');
      populateOptions('topping-options', data.toppings, 'toppings', true);
    });

  const form = document.getElementById('pizza-form');
  form.addEventListener('submit', handleFormSubmit);
});

function populateOptions(containerId, options, name, isCheckbox = false) {
  const container = document.getElementById(containerId);
  options.forEach(opt => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = isCheckbox ? 'checkbox' : 'radio';
    input.name = name;
    input.value = opt;
    label.appendChild(input);
    label.append(` ${opt}`);
    container.appendChild(label);
    container.appendChild(document.createElement('br'));
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const pizza = {
    crust: data.get('crust'),
    sauce: data.get('sauce'),
    cheese: data.get('cheese'),
    toppings: data.getAll('toppings')
  };
  console.log('Pizza selected:', pizza);
  // Send pizza to preview.js for rendering
  renderPizza(pizza);
  // Show price (stub for now)
  document.getElementById('price-display').textContent = `Price: $${(8 + pizza.toppings.length * 0.5).toFixed(2)}`;
}
