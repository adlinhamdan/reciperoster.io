// Handle "Tried" status persistently
document.addEventListener('DOMContentLoaded', function () {
    const recipeCards = document.querySelectorAll('.recipe-card');
  
    recipeCards.forEach((card) => {
      const recipeId = card.getAttribute('data-id');
      const triedStatus = localStorage.getItem(`tried-${recipeId}`) === 'true';
      const icon = card.querySelector('.action-icon');
  
      // Update the UI based on the saved status
      updateIconAndTooltip(icon, triedStatus);
    });
  });
  
  // Function to toggle the "Tried" status
  function markAsTried(icon, event) {
    // Prevent navigation to the linked page
    event.preventDefault();
  
    const card = icon.closest('.recipe-card');
    const recipeId = card.getAttribute('data-id');
    const isTried = localStorage.getItem(`tried-${recipeId}`) === 'true'; // Read current state from localStorage
    const newStatus = !isTried; // Toggle state
  
    // Save the new status to localStorage
    localStorage.setItem(`tried-${recipeId}`, newStatus);
  
    // Update the icon and tooltip dynamically
    updateIconAndTooltip(icon, newStatus);
  }
  
  // Function to update the icon and tooltip dynamically
  function updateIconAndTooltip(icon, isTried) {
    const tooltip = icon.nextElementSibling;
  
    if (isTried) {
      icon.src = 'tried-placeholder.png'; // Replace with your ticked icon
      icon.alt = "Undo 'Tried' status";
      icon.setAttribute('data-tooltip', "Undo 'Tried' status");
      tooltip.textContent = "Undo 'Tried' status";
    } else {
      icon.src = 'mark-as-tried-placeholder.png'; // Replace with your unticked icon
      icon.alt = 'Mark as Tried';
      icon.setAttribute('data-tooltip', 'Mark as Tried');
      tooltip.textContent = 'Mark as Tried';
    }
  }
  
  // Key for localStorage
  const shoppingListKey = 'shopping-list';
  
  // Load existing shopping list from localStorage
  let shoppingList = JSON.parse(localStorage.getItem(shoppingListKey)) || [];
  
  // Function to update the shopping list UI
  function updateShoppingListUI() {
    const shoppingListElement = document.getElementById('shopping-list');
    if (shoppingListElement) {
      shoppingListElement.innerHTML = '';
      shoppingList.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        shoppingListElement.appendChild(li);
      });
    }
  }
  
  // Add selected ingredients to the shopping list
  function addToShoppingList() {
    const ingredientCheckboxes = document.querySelectorAll(
      '.ingredient-checkbox'
    );
    ingredientCheckboxes.forEach((checkbox) => {
      if (checkbox.checked && !shoppingList.includes(checkbox.value)) {
        shoppingList.push(checkbox.value);
      }
    });
  
    // Save the shopping list to localStorage
    localStorage.setItem(shoppingListKey, JSON.stringify(shoppingList));
    alert('Ingredients added to the shopping list!');
    updateShoppingListUI();
  }
  
  // Attach event listener to the "Add to Shopping List" button
  document.addEventListener('DOMContentLoaded', () => {
    const addToShoppingListButton = document.getElementById(
      'add-to-shopping-list'
    );
    if (addToShoppingListButton) {
      addToShoppingListButton.addEventListener('click', addToShoppingList);
    }
  
    // Initialize shopping list UI
    updateShoppingListUI();
  });
  
  // Handle comments and ratings
  const commentForm = document.getElementById('comment-form');
  const commentsContainer = document.getElementById('comments-container');
  const commentsKey = 'comments';
  const comments = JSON.parse(localStorage.getItem(commentsKey)) || [];
  
  // Display existing comments
  function updateCommentsUI() {
    commentsContainer.innerHTML = '';
    comments.forEach((comment, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <p><strong>${comment.firstName} ${comment.lastName}</strong> rated ${comment.rating}/5</p>
        <p>${comment.text}</p>
        <button onclick="deleteComment(${index})">Delete</button>
      `;
      commentsContainer.appendChild(li);
    });
  }
  
  // Add a new comment
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const rating = document.getElementById('rating').value;
    const commentText = document.getElementById('comment').value;
  
    const newComment = {
      firstName,
      lastName,
      rating,
      text: commentText,
    };
  
    comments.push(newComment);
    localStorage.setItem(commentsKey, JSON.stringify(comments));
    commentForm.reset();
    updateCommentsUI();
  });
  
  // Delete a comment
  function deleteComment(index) {
    comments.splice(index, 1);
    localStorage.setItem(commentsKey, JSON.stringify(comments));
    updateCommentsUI();
  }
  
  // Initialize comments UI on page load
  document.addEventListener('DOMContentLoaded', updateCommentsUI);
  
  function toggleInstructions() {
    const instructionsContent = document.querySelector('.instructions-content');
    const collapseBtn = document.querySelector('.collapse-btn');
  
    if (
      instructionsContent.style.display === 'none' ||
      !instructionsContent.style.display
    ) {
      instructionsContent.style.display = 'block';
      collapseBtn.textContent = 'Hide Instructions';
    } else {
      instructionsContent.style.display = 'none';
      collapseBtn.textContent = 'View Instructions';
    }
  }
  