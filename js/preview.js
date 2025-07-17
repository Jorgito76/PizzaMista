// preview.js

function renderPizza(pizza) {
  const preview = document.getElementById('pizza-visual');
  preview.innerHTML = ''; // Clear previous preview

  // Create base pizza circle
  const base = document.createElement('div');
  base.style.width = '200px';
  base.style.height = '200px';
  base.style.borderRadius = '50%';
  base.style.backgroundColor = '#f5d6a1'; // crust color
  base.style.position = 'relative';
  preview.appendChild(base);

  // Layer sauce (simplified as background tint)
  if (pizza.sauce) {
    base.style.boxShadow = `inset 0 0 0 60px ${getSauceColor(pizza.sauce)}`;
  }

  // Layer toppings
  pizza.toppings.forEach((topping, index) => {
    const dot = document.createElement('div');
    dot.textContent = topping[0]; // First letter as icon
    dot.style.position = 'absolute';
    dot.style.left = `${Math.random() * 160 + 20}px`;
    dot.style.top = `${Math.random() * 160 + 20}px`;
    dot.style.backgroundColor = '#00000040';
    dot.style.color = 'white';
    dot.style.padding = '2px 4px';
    dot.style.borderRadius = '4px';
    dot.style.fontSize = '0.75rem';
    dot.style.opacity = '0';
    dot.style.transition = 'opacity 0.5s ease';
    base.appendChild(dot);

    // Fade in with delay
    setTimeout(() => {
      dot.style.opacity = '1';
    }, 100 * index);
  });
}

function getSauceColor(sauce) {
  switch (sauce) {
    case 'Tomato': return '#d62828';
    case 'Pesto': return '#588157';
    case 'White Garlic': return '#fdfcdc';
    default: return '#f5d6a1';
  }
}

function updatePreview() {
  const visual = document.getElementById('pizza-visual');
  visual.innerHTML = ''; // clear previous layers

  const data = new FormData(document.getElementById('pizza-form'));

  const crust = data.get('crust');
  const sauce = data.get('sauce');
  const cheese = data.get('cheese');
  const toppings = data.getAll('toppings');

  // Basic colored layers (could use images or emojis too)
  addLayer(visual, sauce, 'rgba(255, 0, 0, 0.3)');
  addLayer(visual, cheese, 'rgba(255, 255, 0, 0.3)');

  toppings.forEach(topping => {
    addLayer(visual, topping, 'rgba(0, 128, 0, 0.2)'); // same color for demo
  });
}

function addLayer(container, label, color) {
  const layer = document.createElement('div');
  layer.className = 'topping-layer';
  layer.style.backgroundColor = color;
  layer.title = label;
  container.appendChild(layer);
}

