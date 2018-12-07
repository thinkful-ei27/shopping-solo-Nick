'use strict';

const STORE = {
  items: [
      {name: "apples", checked: false},
      {name: "oranges", checked: false},
      {name: "milk", checked: true},
      {name: "bread", checked: false}
  ],
  displayUncheckedOnly: false
};

function handleDisplayUncheckedOnlyItems() {
    $('#displayUncheckedOnly').on('click', event=> {
        console.log('Checking works!');
        changeSTOREDisplayUncheckedOnly();
        renderShoppingList();
    })
}

function changeSTOREDisplayUncheckedOnly() {}
    STORE.displayUncheckedOnly = !STORE.displayUncheckedOnly;
}

function hideCheckedItems () {
    //Legacy code. This is currently being handled within the generateItemElement function

}



function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}" ${STORE.displayUncheckedOnly ? item.checked ? "hidden" : '' : ''}>
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join("");
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE.items);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}
function toggleCheckedForListItem(itemIndex) {
    STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}


function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', `.js-item-delete`, event => {
      const itemIndex = getItemIndexFromElement(event.currentTarget);
      deleteItem(itemIndex);
      renderShoppingList();
  });
}

function deleteItem(index) {
  STORE.items.splice(index, 1);
}

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleDisplayUncheckedOnlyItems();
}

$(handleShoppingList);