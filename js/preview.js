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
