// Load existing shopping list
const shoppingListKey = 'shopping-list';
let shoppingList = JSON.parse(localStorage.getItem(shoppingListKey)) || [];
const shoppingListElement = document.getElementById('shopping-list');

// Populate the shopping list UI
function updateShoppingListUI() {
  shoppingListElement.innerHTML = '';
  shoppingList.forEach((item, index) => {
    const li = document.createElement('li');
    li.contentEditable = true; // Make the list item editable
    li.textContent = item;

    // Save changes on blur (when editing is finished)
    li.addEventListener('blur', () => {
      shoppingList[index] = li.textContent.trim();
      localStorage.setItem(shoppingListKey, JSON.stringify(shoppingList));
    });

    shoppingListElement.appendChild(li);
  });
}

// Download the shopping list as a PDF
document.getElementById('download-list').addEventListener('click', () => {
  const jsPDF = window.jspdf.jsPDF;
  const doc = new jsPDF();

  doc.text('Shopping List', 10, 10);
  shoppingList.forEach((item, index) => {
    doc.text(`${index + 1}. ${item}`, 10, 20 + index * 10);
  });

  doc.save('shopping-list.pdf');
});

// Reset the shopping list
document.getElementById('reset-list').addEventListener('click', () => {
  if (confirm('Are you sure you want to clear the entire shopping list?')) {
    shoppingList = [];
    localStorage.setItem(shoppingListKey, JSON.stringify(shoppingList));
    updateShoppingListUI();
  }
});

// Initialize shopping list UI on page load
document.addEventListener('DOMContentLoaded', updateShoppingListUI);
