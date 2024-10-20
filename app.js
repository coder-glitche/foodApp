const foodItems = [
    { name: "Vada Pav", price: 65 },
    { name: "Momo", price: 50 },
    { name: "Gobi", price: 95 },
    { name: "Maggi", price: 28 },
    { name: "Juice", price: 20 }
];

let remainingBudget = localStorage.getItem('remainingBudget') ? parseFloat(localStorage.getItem('remainingBudget')) : 1000;
let remainingDays = localStorage.getItem('remainingDays') ? parseInt(localStorage.getItem('remainingDays')) : 30;
let logList = localStorage.getItem('logList') ? JSON.parse(localStorage.getItem('logList')) : [];

document.addEventListener('DOMContentLoaded', () => {
    const budgetDisplay = document.getElementById('remainingBudget');
    const daysDisplay = document.getElementById('remainingDays');
    const foodList = document.getElementById('foodList');
    const logDisplay = document.getElementById('logList');

    // Display food items as buttons with remaining counts
    foodItems.forEach(item => {
        const button = document.createElement('button');
        button.textContent = `${item.name} - ₹${item.price} (Remaining: ${Math.floor(remainingBudget / item.price)})`;
        button.addEventListener('click', () => selectFood(item));
        foodList.appendChild(button);
    });

    // Display saved data on load
    updateDisplay();

    // Update budget and log when a food is selected
    function selectFood(item) {
        if (remainingDays > 0 && remainingBudget >= item.price) {
            remainingBudget -= item.price;
            remainingDays--;
            logList.push(`Day ${30 - remainingDays}: ${item.name} - ₹${item.price}`);
            saveDataToLocalStorage();
            updateDisplay();
        } else {
            alert('Not enough budget or days left!');
        }
    }

    // Save data to localStorage
    function saveDataToLocalStorage() {
        localStorage.setItem('remainingBudget', remainingBudget);
        localStorage.setItem('remainingDays', remainingDays);
        localStorage.setItem('logList', JSON.stringify(logList));
    }

    // Update the display
    function updateDisplay() {
        budgetDisplay.textContent = remainingBudget;
        daysDisplay.textContent = remainingDays;
        logDisplay.innerHTML = '';
        logList.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = entry;
            logDisplay.appendChild(li);
        });

        // Update remaining counts for each food item
        foodList.innerHTML = '';
        foodItems.forEach(item => {
            const button = document.createElement('button');
            button.textContent = `${item.name} - ₹${item.price} (Remaining: ${Math.floor(remainingBudget / item.price)})`;
            button.addEventListener('click', () => selectFood(item));
            foodList.appendChild(button);
        });
    }
});
