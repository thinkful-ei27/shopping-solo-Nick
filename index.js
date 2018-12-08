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

function generateItemElement(item, itemIndex, template) {
  return `
    <li class='js-item-index-element' data-item-index='${itemIndex}' \
    ${STORE.displayUncheckedOnly && item.checked ? 'hidden' : ''}\
    ${STORE.displaySearchMatchOnly && !item.searchMatch ? 'hidden' : ''}>
      <span class='shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}'>${item.name}</span>
      <div class='shopping-item-controls'>
        <button class='shopping-item-toggle js-item-toggle'>
            <span class='button-label'>check</span>
        </button>
        <button class='shopping-item-delete js-item-delete'>
            <span class="button-label">delete</span>
        </button>
        <button class='shopping-item-edit js-item-edit' id='js-shopping-list-edit'>
            <span class='button-label'>edit</span>
        </button>
      </div>
    </li>`;
}

function handleEditNameRequest() {
  //listen for edit button click
  $('.shopping-item-edit').on('click', function(event) {
    event.preventDefault();
    const newName = prompt('Please insert new name for item');
    console.log(newName);
  }
  );

  //prompt asks for new name for item
  //JavaScript replaces old name in STORE with prompt's input
  //(We have a function that gets the index)
  //render list
  
}



function handleNewSearchItemSubmit() {
    $('#js-shopping-list-search').submit(function(event) {
        event.preventDefault();
        const testValue = RegExp($('.js-shopping-list-search-entry').val());
        $('.js-shopping-list-search-entry').val('');
        searchThroughStoreForMatch(testValue);
        STORE.displaySearchMatchOnly = true;
        renderShoppingList();
    })
   
}

function resetSTORESEARCHMATCH(){
    STORE.items.forEach(function(element){
       element.searchMatch = false;
    });
}

function resetSTOREDisplaySearchOnly(){
    STORE.displaySearchMatchOnly = false;
}

function searchThroughStoreForMatch(value) {
    for(let x = 0; x < STORE.items.length; x++){
        checkForMatch(value, STORE.items[x].name) ?
        STORE.items[x].searchMatch = true : STORE.items[x].searchMatch = false;
      }
    }

function checkForMatch(value, itemName) {
    return value.test(itemName);
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
  STORE.items.push({name: itemName, checked: false, searchMatch: true});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
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
  handleEditNameRequest();
  console.log(STORE);
}

$(handleShoppingList);