const foodItems = [
    { name: "Juice", price: 20, maxDays: 10 },
    { name: "Maggi", price: 28, maxDays: 8 },
    { name: "Momo", price: 50, maxDays: 5 },
    { name: "Gobi", price: 95, maxDays: 3 },
    { name: "Vada Pav", price: 65, maxDays: 4 }
];

let remainingBudget = localStorage.getItem('remainingBudget') ? parseFloat(localStorage.getItem('remainingBudget')) : 1000;
let remainingDays = localStorage.getItem('remainingDays') ? parseInt(localStorage.getItem('remainingDays')) : 30;
let logList = localStorage.getItem('logList') ? JSON.parse(localStorage.getItem('logList')) : [];
let itemCount = localStorage.getItem('itemCount') ? JSON.parse(localStorage.getItem('itemCount')) : foodItems.map(item => ({ name: item.name, count: item.maxDays }));

document.addEventListener('DOMContentLoaded', () => {
    const budgetDisplay = document.getElementById('remainingBudget');
    const daysDisplay = document.getElementById('remainingDays');
    const foodList = document.getElementById('foodList');
    const logDisplay = document.getElementById('logList');
    const resetButton = document.getElementById('resetButton');

    // Display food items as buttons with remaining counts
    foodItems.forEach(item => {
        const button = document.createElement('button');
        const remainingItem = itemCount.find(i => i.name === item.name);
        button.textContent = `${item.name} - ₹${item.price} (Remaining: ${remainingItem.count})`;
        button.addEventListener('click', () => selectFood(item, remainingItem));
        foodList.appendChild(button);
    });

    // Display saved data on load
    updateDisplay();

    // Update budget, log, and item counts when a food is selected
    function selectFood(item, remainingItem) {
        if (remainingDays > 0 && remainingBudget >= item.price && remainingItem.count > 0) {
            remainingBudget -= item.price;
            remainingDays--;
            remainingItem.count--;
            logList.push(`Day ${30 - remainingDays}: ${item.name} - ₹${item.price}`);
            saveDataToLocalStorage();
            updateDisplay();
        } else if (remainingItem.count <= 0) {
            alert(`${item.name} limit reached!`);
        } else {
            alert('Not enough budget or days left!');
        }
    }

    // Save data to localStorage
    function saveDataToLocalStorage() {
        localStorage.setItem('remainingBudget', remainingBudget);
        localStorage.setItem('remainingDays', remainingDays);
        localStorage.setItem('logList', JSON.stringify(logList));
        localStorage.setItem('itemCount', JSON.stringify(itemCount));
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
            const remainingItem = itemCount.find(i => i.name === item.name);
            const button = document.createElement('button');
            button.textContent = `${item.name} - ₹${item.price} (Remaining: ${remainingItem.count})`;
            button.addEventListener('click', () => selectFood(item, remainingItem));
            foodList.appendChild(button);
        });
    }

    // Add reset functionality
    resetButton.addEventListener('click', () => {
        // Reset all variables and local storage
        remainingBudget = 1000;
        remainingDays = 30;
        logList = [];
        itemCount = foodItems.map(item => ({ name: item.name, count: item.maxDays }));
        localStorage.clear(); // Clear all data in localStorage
        updateDisplay(); // Update the display after resetting
    });
});
