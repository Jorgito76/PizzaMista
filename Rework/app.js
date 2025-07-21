// Pizza Builder App JavaScript

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Pizza Options Elements
    const sizeButtons = document.querySelectorAll('.size-btn');
    const crustButtons = document.querySelectorAll('.crust-btn');
    const sauceButtons = document.querySelectorAll('.sauce-btn');
    const cheeseButtons = document.querySelectorAll('.cheese-btn');
    const toppingItems = document.querySelectorAll('.topping-item');
    const pizzaToppings = document.querySelector('.pizza-toppings');
    const pizzaBase = document.querySelector('.pizza-base');
    const pizzaSauce = document.querySelector('.pizza-sauce');
    const pizzaCheese = document.querySelector('.pizza-cheese');
    
    // Summary Elements
    const summarySize = document.getElementById('summary-size');
    const summaryCrust = document.getElementById('summary-crust');
    const summarySauce = document.getElementById('summary-sauce');
    const summaryCheese = document.getElementById('summary-cheese');
    const summaryToppings = document.getElementById('summary-toppings');
    
    // Nutritional Elements
    const nutritionCalories = document.getElementById('nutrition-calories');
    const nutritionProtein = document.getElementById('nutrition-protein');
    const nutritionCarbs = document.getElementById('nutrition-carbs');
    const nutritionFat = document.getElementById('nutrition-fat');
    
    // Price Elements
    const priceSubtotal = document.getElementById('price-subtotal');
    const priceTax = document.getElementById('price-tax');
    const priceTotal = document.getElementById('price-total');
    const checkoutTotal = document.getElementById('checkout-total');
    
    // Modal Elements
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const confirmationModal = document.getElementById('confirmation-modal');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const newOrderBtn = document.getElementById('new-order-btn');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Loyalty Program Elements
    const loyaltyPoints = document.getElementById('loyalty-points');
    const availablePoints = document.getElementById('available-points');
    const usePointsCheckbox = document.getElementById('use-points');
    const earnedPoints = document.getElementById('earned-points');
    
    // Payment Elements
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const creditCardDetails = document.getElementById('credit-card-details');
    
    // Pizza state
    const pizzaState = {
        size: 'medium',
        crust: 'regular',
        sauce: 'tomato',
        cheese: 'mozzarella',
        toppings: [],
        price: 10.99,
        taxRate: 0.08,
        loyaltyPoints: 0,
        nutritionalInfo: {
            calories: 800,
            protein: 30,
            carbs: 100,
            fat: 25
        }
    };

    // Nutritional values for different ingredients
    const nutritionalValues = {
        size: {
            small: { calories: 600, protein: 20, carbs: 80, fat: 20 },
            medium: { calories: 800, protein: 30, carbs: 100, fat: 25 },
            large: { calories: 1000, protein: 40, carbs: 120, fat: 30 },
            'x-large': { calories: 1200, protein: 50, carbs: 140, fat: 35 }
        },
        crust: {
            regular: { calories: 0, protein: 0, carbs: 0, fat: 0 },
            thin: { calories: -100, protein: -5, carbs: -20, fat: -2 },
            stuffed: { calories: 200, protein: 8, carbs: 30, fat: 5 },
            'gluten-free': { calories: -50, protein: 0, carbs: -15, fat: 0 }
        },
        sauce: {
            tomato: { calories: 0, protein: 0, carbs: 0, fat: 0 },
            bbq: { calories: 50, protein: 0, carbs: 10, fat: 0 },
            garlic: { calories: 40, protein: 0, carbs: 5, fat: 3 },
            alfredo: { calories: 100, protein: 3, carbs: 5, fat: 8 }
        },
        cheese: {
            mozzarella: { calories: 0, protein: 0, carbs: 0, fat: 0 },
            cheddar: { calories: 30, protein: 2, carbs: 0, fat: 3 },
            parmesan: { calories: 20, protein: 3, carbs: 0, fat: 1 },
            vegan: { calories: -20, protein: -2, carbs: 2, fat: -3 }
        },
        toppings: {
            pepperoni: { calories: 80, protein: 4, carbs: 1, fat: 7 },
            sausage: { calories: 100, protein: 6, carbs: 2, fat: 8 },
            mushrooms: { calories: 10, protein: 1, carbs: 2, fat: 0 },
            onions: { calories: 15, protein: 0, carbs: 3, fat: 0 },
            peppers: { calories: 10, protein: 0, carbs: 2, fat: 0 },
            olives: { calories: 25, protein: 0, carbs: 1, fat: 2 },
            bacon: { calories: 90, protein: 5, carbs: 0, fat: 7 },
            ham: { calories: 60, protein: 7, carbs: 1, fat: 3 },
            pineapple: { calories: 30, protein: 0, carbs: 8, fat: 0 },
            spinach: { calories: 5, protein: 1, carbs: 1, fat: 0 }
        }
    };

    // Popular pizza recommendations
    const pizzaRecommendations = [
        { name: 'Meat Lovers', toppings: ['pepperoni', 'sausage', 'bacon', 'ham'] },
        { name: 'Veggie Supreme', toppings: ['mushrooms', 'onions', 'peppers', 'olives', 'spinach'] },
        { name: 'Hawaiian', toppings: ['ham', 'pineapple'] },
        { name: 'BBQ Chicken', toppings: ['onions', 'peppers'], sauce: 'bbq', cheese: 'cheddar' }
    ];

    // Initialize the app
    function init() {
        // Set up button selection handlers
        setupSizeButtons();
        setupCrustButtons();
        setupSauceButtons();
        setupCheeseButtons();
        
        // Set up drag and drop functionality
        setupDragAndDrop();
        
        // Set up modal functionality
        setupModals();
        
        // Set up payment options
        setupPaymentOptions();
        
        // Generate recommendations
        generateRecommendations();
        
        // Initialize loyalty program
        initLoyaltyProgram();
        
        // Update the UI
        updatePizzaVisual();
        updateOrderSummary();
        updateNutritionalInfo();
        updatePriceInfo();
    }

    // Button Selection Handlers
    function setupSizeButtons() {
        sizeButtons.forEach(button => {
            button.addEventListener('click', function() {
                sizeButtons.forEach(btn => btn.classList.remove('selected'));
                this.classList.add('selected');
                pizzaState.size = this.dataset.size;
                pizzaState.price = parseFloat(this.dataset.price);
                updatePizzaVisual();
                updateOrderSummary();
                updateNutritionalInfo();
                updatePriceInfo();
            });
        });
    }

    function setupCrustButtons() {
        crustButtons.forEach(button => {
            button.addEventListener('click', function() {
                crustButtons.forEach(btn => btn.classList.remove('selected'));
                this.classList.add('selected');
                pizzaState.crust = this.dataset.crust;
                updatePizzaVisual();
                updateOrderSummary();
                updateNutritionalInfo();
                updatePriceInfo();
            });
        });
    }

    function setupSauceButtons() {
        sauceButtons.forEach(button => {
            button.addEventListener('click', function() {
                sauceButtons.forEach(btn => btn.classList.remove('selected'));
                this.classList.add('selected');
                pizzaState.sauce = this.dataset.sauce;
                updatePizzaVisual();
                updateOrderSummary();
                updateNutritionalInfo();
                updatePriceInfo();
            });
        });
    }

    function setupCheeseButtons() {
        cheeseButtons.forEach(button => {
            button.addEventListener('click', function() {
                cheeseButtons.forEach(btn => btn.classList.remove('selected'));
                this.classList.add('selected');
                pizzaState.cheese = this.dataset.cheese;
                updatePizzaVisual();
                updateOrderSummary();
                updateNutritionalInfo();
                updatePriceInfo();
            });
        });
    }

    // Drag and Drop Functionality
    function setupDragAndDrop() {
        toppingItems.forEach(item => {
            item.addEventListener('dragstart', dragStart);
            item.addEventListener('dragend', dragEnd);
        });

        pizzaToppings.addEventListener('dragover', dragOver);
        pizzaToppings.addEventListener('dragenter', dragEnter);
        pizzaToppings.addEventListener('dragleave', dragLeave);
        pizzaToppings.addEventListener('drop', drop);
    }

    function dragStart(e) {
        this.classList.add('dragging');
        e.dataTransfer.setData('text/plain', this.dataset.topping);
    }

    function dragEnd(e) {
        this.classList.remove('dragging');
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    }

    function dragLeave() {
        this.classList.remove('drag-over');
    }

    function drop(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        const toppingType = e.dataTransfer.getData('text/plain');
        
        // Check if topping is already on the pizza
        if (!pizzaState.toppings.includes(toppingType)) {
            pizzaState.toppings.push(toppingType);
            
            // Calculate the position for the topping (random within the pizza)
            const offsetX = e.offsetX;
            const offsetY = e.offsetY;
            
            // Add the topping to the pizza visualization
            addToppingToPizza(toppingType, offsetX, offsetY);
            
            // Update the order summary, nutritional info, and price
            updateOrderSummary();
            updateNutritionalInfo();
            updatePriceInfo();
        }
    }

    function addToppingToPizza(toppingType, x, y) {
        const toppingElement = document.createElement('div');
        toppingElement.classList.add('topping-on-pizza', toppingType);
        toppingElement.dataset.topping = toppingType;
        toppingElement.style.backgroundColor = document.querySelector(`.topping-img.${toppingType}`).style.backgroundColor;
        
        // Position the topping
        toppingElement.style.left = `${x - 10}px`; // Adjust for topping size (20px)
        toppingElement.style.top = `${y - 10}px`;
        
        // Add topping to the pizza
        pizzaToppings.appendChild(toppingElement);
        
        // Add remove functionality (click to remove)
        toppingElement.addEventListener('click', function() {
            // Remove from state
            pizzaState.toppings = pizzaState.toppings.filter(t => t !== toppingType);
            
            // Remove from DOM
            this.remove();
            
            // Update summary, nutritional info, and price
            updateOrderSummary();
            updateNutritionalInfo();
            updatePriceInfo();
        });
    }

    // Update UI Functions
    function updatePizzaVisual() {
        // Update pizza size
        let sizeScale = 1;
        switch(pizzaState.size) {
            case 'small': sizeScale = 0.8; break;
            case 'medium': sizeScale = 1; break;
            case 'large': sizeScale = 1.1; break;
            case 'x-large': sizeScale = 1.2; break;
        }
        
        // Update crust appearance
        switch(pizzaState.crust) {
            case 'regular': pizzaBase.style.backgroundColor = '#f5d6ab'; break;
            case 'thin': pizzaBase.style.backgroundColor = '#f0ca98'; break;
            case 'stuffed': pizzaBase.style.backgroundColor = '#f7ddb9'; break;
            case 'gluten-free': pizzaBase.style.backgroundColor = '#e6c392'; break;
        }
        
        // Update sauce appearance
        switch(pizzaState.sauce) {
            case 'tomato': pizzaSauce.style.backgroundColor = '#c72f08'; break;
            case 'bbq': pizzaSauce.style.backgroundColor = '#5a2108'; break;
            case 'garlic': pizzaSauce.style.backgroundColor = '#f0e6d2'; break;
            case 'alfredo': pizzaSauce.style.backgroundColor = '#f5f5dc'; break;
        }
        
        // Update cheese appearance
        switch(pizzaState.cheese) {
            case 'mozzarella': pizzaCheese.style.backgroundColor = '#f3cc7a'; break;
            case 'cheddar': pizzaCheese.style.backgroundColor = '#e09c0b'; break;
            case 'parmesan': pizzaCheese.style.backgroundColor = '#f0e0a0'; break;
            case 'vegan': pizzaCheese.style.backgroundColor = '#f0d68a'; break;
        }
    }

    function updateOrderSummary() {
        // Update summary text
        summarySize.textContent = capitalizeFirstLetter(pizzaState.size);
        summaryCrust.textContent = capitalizeFirstLetter(pizzaState.crust);
        summarySauce.textContent = capitalizeFirstLetter(pizzaState.sauce);
        summaryCheese.textContent = capitalizeFirstLetter(pizzaState.cheese);
        
        // Update toppings list
        if (pizzaState.toppings.length === 0) {
            summaryToppings.textContent = 'None';
        } else {
            const toppingsList = pizzaState.toppings.map(topping => capitalizeFirstLetter(topping)).join(', ');
            summaryToppings.textContent = toppingsList;
        }
    }

    function updateNutritionalInfo() {
        // Calculate base nutritional values from size
        let calories = nutritionalValues.size[pizzaState.size].calories;
        let protein = nutritionalValues.size[pizzaState.size].protein;
        let carbs = nutritionalValues.size[pizzaState.size].carbs;
        let fat = nutritionalValues.size[pizzaState.size].fat;
        
        // Add values from crust
        calories += nutritionalValues.crust[pizzaState.crust].calories;
        protein += nutritionalValues.crust[pizzaState.crust].protein;
        carbs += nutritionalValues.crust[pizzaState.crust].carbs;
        fat += nutritionalValues.crust[pizzaState.crust].fat;
        
        // Add values from sauce
        calories += nutritionalValues.sauce[pizzaState.sauce].calories;
        protein += nutritionalValues.sauce[pizzaState.sauce].protein;
        carbs += nutritionalValues.sauce[pizzaState.sauce].carbs;
        fat += nutritionalValues.sauce[pizzaState.sauce].fat;
        
        // Add values from cheese
        calories += nutritionalValues.cheese[pizzaState.cheese].calories;
        protein += nutritionalValues.cheese[pizzaState.cheese].protein;
        carbs += nutritionalValues.cheese[pizzaState.cheese].carbs;
        fat += nutritionalValues.cheese[pizzaState.cheese].fat;
        
        // Add values from toppings
        pizzaState.toppings.forEach(topping => {
            calories += nutritionalValues.toppings[topping].calories;
            protein += nutritionalValues.toppings[topping].protein;
            carbs += nutritionalValues.toppings[topping].carbs;
            fat += nutritionalValues.toppings[topping].fat;
        });
        
        // Update state
        pizzaState.nutritionalInfo = { calories, protein, carbs, fat };
        
        // Update UI
        nutritionCalories.textContent = calories;
        nutritionProtein.textContent = `${protein}g`;
        nutritionCarbs.textContent = `${carbs}g`;
        nutritionFat.textContent = `${fat}g`;
    }

    function updatePriceInfo() {
        // Calculate base price from selected size
        let basePrice = pizzaState.price;
        
        // Add price for crust
        const crustBtn = document.querySelector(`.crust-btn.selected`);
        basePrice += parseFloat(crustBtn.dataset.price || 0);
        
        // Add price for sauce
        const sauceBtn = document.querySelector(`.sauce-btn.selected`);
        basePrice += parseFloat(sauceBtn.dataset.price || 0);
        
        // Add price for cheese
        const cheeseBtn = document.querySelector(`.cheese-btn.selected`);
        basePrice += parseFloat(cheeseBtn.dataset.price || 0);
        
        // Add price for toppings
        const toppingPrice = 0.99 * pizzaState.toppings.length;
        basePrice += toppingPrice;
        
        // Calculate tax
        const tax = basePrice * pizzaState.taxRate;
        const totalPrice = basePrice + tax;
        
        // Update UI
        priceSubtotal.textContent = `$${basePrice.toFixed(2)}`;
        priceTax.textContent = `$${tax.toFixed(2)}`;
        priceTotal.textContent = `$${totalPrice.toFixed(2)}`;
        checkoutTotal.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Modal Functionality
    function setupModals() {
        checkoutBtn.addEventListener('click', function() {
            // Show checkout modal
            checkoutModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
        
        placeOrderBtn.addEventListener('click', function() {
            // Hide checkout modal
            checkoutModal.style.display = 'none';
            
            // Process loyalty points
            if (usePointsCheckbox.checked && pizzaState.loyaltyPoints >= 100) {
                pizzaState.loyaltyPoints -= 100;
                loyaltyPoints.textContent = `${pizzaState.loyaltyPoints} points`;
            }
            
            // Show confirmation modal
            confirmationModal.style.display = 'block';
            
            // Add points for this order
            const pointsEarned = Math.floor(calculateTotalPrice() * 2); // 2 points per dollar
            pizzaState.loyaltyPoints += pointsEarned;
            earnedPoints.textContent = pointsEarned;
            loyaltyPoints.textContent = `${pizzaState.loyaltyPoints} points`;
        });
        
        newOrderBtn.addEventListener('click', function() {
            // Reset the pizza builder
            resetPizzaBuilder();
            
            // Hide confirmation modal
            confirmationModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        });
        
        closeModalButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Hide all modals
                checkoutModal.style.display = 'none';
                confirmationModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Enable scrolling
            });
        });
        
        // Close modals when clicking outside the content
        window.addEventListener('click', function(event) {
            if (event.target === checkoutModal) {
                checkoutModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            if (event.target === confirmationModal) {
                confirmationModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Payment Options
    function setupPaymentOptions() {
        paymentOptions.forEach(option => {
            option.addEventListener('change', function() {
                if (this.id === 'credit-card') {
                    creditCardDetails.style.display = 'block';
                } else {
                    creditCardDetails.style.display = 'none';
                }
            });
        });
    }

    // Loyalty Program
    function initLoyaltyProgram() {
        // Initialize with 0 points
        pizzaState.loyaltyPoints = 0;
        loyaltyPoints.textContent = `${pizzaState.loyaltyPoints} points`;
        availablePoints.textContent = `(${pizzaState.loyaltyPoints} points available)`;
        
        // Disable points redemption if not enough points
        usePointsCheckbox.disabled = true;
        
        // Add listener for point redemption
        usePointsCheckbox.addEventListener('change', function() {
            updatePriceInfo();
        });
        
        // Mock login functionality
        document.getElementById('login-button').addEventListener('click', function() {
            // Simulate login and points loading
            pizzaState.loyaltyPoints = 150; // Example: user has 150 points
            loyaltyPoints.textContent = `${pizzaState.loyaltyPoints} points`;
            availablePoints.textContent = `(${pizzaState.loyaltyPoints} points available)`;
            
            // Enable points redemption if enough points
            usePointsCheckbox.disabled = pizzaState.loyaltyPoints < 100;
            
            // Update login button
            this.textContent = 'Logout';
        });
    }

    // Generate Recommendations
    function generateRecommendations() {
        const recommendationContainer = document.querySelector('.recommendation-items');
        
        pizzaRecommendations.forEach(pizza => {
            const recommendation = document.createElement('div');
            recommendation.classList.add('recommendation-item');
            
            recommendation.innerHTML = `
                <h4>${pizza.name}</h4>
                <p>${pizza.toppings.join(', ')}</p>
                <button class="try-btn">Try This</button>
            `;
            
            recommendationContainer.appendChild(recommendation);
            
            // Add functionality to try button
            recommendation.querySelector('.try-btn').addEventListener('click', function() {
                applyRecommendation(pizza);
            });
        });
    }

    function applyRecommendation(pizza) {
        // Clear current toppings
        pizzaState.toppings = [];
        pizzaToppings.innerHTML = '';
        
        // Set sauce if specified
        if (pizza.sauce) {
            const sauceBtn = document.querySelector(`.sauce-btn[data-sauce="${pizza.sauce}"]`);
            if (sauceBtn) {
                sauceButtons.forEach(btn => btn.classList.remove('selected'));
                sauceBtn.classList.add('selected');
                pizzaState.sauce = pizza.sauce;
            }
        }
        
        // Set cheese if specified
        if (pizza.cheese) {
            const cheeseBtn = document.querySelector(`.cheese-btn[data-cheese="${pizza.cheese}"]`);
            if (cheeseBtn) {
                cheeseButtons.forEach(btn => btn.classList.remove('selected'));
                cheeseBtn.classList.add('selected');
                pizzaState.cheese = pizza.cheese;
            }
        }
        
        // Add toppings
        pizza.toppings.forEach(topping => {
            // Add to state
            pizzaState.toppings.push(topping);
            
            // Calculate random position
            const x = Math.random() * 200 + 50; // Random position within pizza
            const y = Math.random() * 200 + 50;
            
            // Add to visualization
            addToppingToPizza(topping, x, y);
        });
        
        // Update UI
        updatePizzaVisual();
        updateOrderSummary();
        updateNutritionalInfo();
        updatePriceInfo();
    }

    // Reset Pizza Builder
    function resetPizzaBuilder() {
        // Reset size
        document.querySelector('.size-btn[data-size="medium"]').click();
        
        // Reset crust
        document.querySelector('.crust-btn[data-crust="regular"]').click();
        
        // Reset sauce
        document.querySelector('.sauce-btn[data-sauce="tomato"]').click();
        
        // Reset cheese
        document.querySelector('.cheese-btn[data-cheese="mozzarella"]').click();
        
        // Clear toppings
        pizzaState.toppings = [];
        pizzaToppings.innerHTML = '';
        
        // Update UI
        updatePizzaVisual();
        updateOrderSummary();
        updateNutritionalInfo();
        updatePriceInfo();
    }

    // Helper Functions
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function calculateTotalPrice() {
        const subtotal = parseFloat(priceSubtotal.textContent.replace('$', ''));
        const tax = parseFloat(priceTax.textContent.replace('$', ''));
        return subtotal + tax;
    }

    // Initialize the app
    init();
});