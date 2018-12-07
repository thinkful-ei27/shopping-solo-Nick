'use strict';

const STORE = {
  items: [
      {name: "apples", checked: false, searchMatch: false},
      {name: "oranges", checked: false, searchMatch: false},
      {name: "milk", checked: true, searchMatch: false},
      {name: "bread", checked: false, searchMatch: false}
  ],
  displayUncheckedOnly: false,
  displaySearchMatchOnly: false
};

function handleDisplayUncheckedOnlyItems() {
    $('#displayUncheckedOnly').on('click', event=> {
        changeSTOREDisplayUncheckedOnly();
        renderShoppingList();
    })
}

function changeSTOREDisplayUncheckedOnly() {
    STORE.displayUncheckedOnly = !STORE.displayUncheckedOnly;
}

function hideCheckedItems () {
    //Legacy code. This is currently being handled within the generateItemElement function
}



function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}" ${STORE.displayUncheckedOnly && item.checked ? 'hidden' : ''}>
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

function handleNewSearchItemSubmit() {
    $('#js-shopping-list-search').submit(function(event) {
        event.preventDefault();
        searchThroughStoreForMatch(createSearchItem());
        $('.js-shopping-list-search-entry').val('');
    })
   
}

function createSearchItem() {
    const searchItem = $('.js-shopping-list-search-entry').val();
    return searchItem;
}

function searchThroughStoreForMatch(value) {
    //this will search through the store to find matching items
    //Using forEach, check if the searchbar value matches the name of the item... match?
    
}

function regExpTransform(value){
    const result = RegExp(value);
    return RegExp(value);
}

function checkForMatch(searchBarValue, itemName) {
    searchBarValue.test(itemName);
}





function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");

  const items = shoppingList.map((item, index, searchMatch) => generateItemElement(item, index, searchMatch));
  
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
  STORE.items.push({name: itemName, checked: false, searchMatch: false});
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
  handleNewSearchItemSubmit();
  console.log(STORE);
}

$(handleShoppingList);