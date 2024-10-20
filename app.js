const foodItems = [
    { name: "Vada Pav", price: 65 },
    { name: "Momo", price: 50 },
    { name: "Gobi", price: 95 },
    { name: "Maggi", price: 28 },
    { name: "Juice", price: 20 }
];

let remainingBudget = 1000;
let remainingDays = 30;
let logList = [];

document.addEventListener('DOMContentLoaded', () => {
    const budgetDisplay = document.getElementById('remainingBudget');
    const daysDisplay = document.getElementById('remainingDays');
    const foodList = document.getElementById('foodList');
    const logDisplay = document.getElementById('logList');

    // Display food items as buttons
    foodItems.forEach(item => {
        const button = document.createElement('button');
        button.textContent = `${item.name} - ₹${item.price}`;
        button.addEventListener('click', () => selectFood(item));
        foodList.appendChild(button);
    });

    // Update budget and log when a food is selected
    function selectFood(item) {
        if (remainingDays > 0 && remainingBudget >= item.price) {
            remainingBudget -= item.price;
            remainingDays--;
            logList.push(`Day ${30 - remainingDays}: ${item.name} - ₹${item.price}`);
            updateDisplay();
        } else {
            alert('Not enough budget or days left!');
        }
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
    }
});
