const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');

const itemList = document.getElementById('item-list');

const clearBtn = document.querySelector('#clear')
// console.log('itemBtn ==>',itemBtn);

const itemFilter = document.querySelector('#filter')

const formBtn = itemForm.querySelector('button');

let isEditMode = false;

// const itemArr = [];

function displayItems() {
    const itemsFromStorage = getItemToStorage();
    itemsFromStorage.forEach((item) => createItem(item));

    checkUI();
}

function addItem(event) {
    event.preventDefault();

    // Validate Input
    const newItem = itemInput.value;
    if (!newItem.trim()) {
        alert('Plzz add an item');
        return;
    }

    // Check for edit mode
    if (isEditMode) {
        let itemToEdit = itemList.querySelector('.edit-mode');
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    }

    createItem(newItem)

    // add item to localstroage
    addItemToStorage(newItem)

    itemInput.value = '';
}

// Create Item 
function createItem(item) {
    const li = document.createElement('li');
    li.innerHTML = `
          ${item}
          <button class="remove-item btn-link text-red">
            <i class="fa-solid fa-xmark"></i>
          </button>
            `;
    itemList.append(li)
    checkUI()

    // console.log('itemList is => ',itemList.children[4]);
}


function addItemToStorage(item) {


    let itemFromStorage = getItemToStorage();

    // const itemArr = [];
    // itemArr.push(item)
    // localStorage.setItem('data',JSON.stringify(itemArr))
    // console.log('itemArr ==>',itemArr);

    // if (localStorage.getItem('items') === null) {
    //     itemFromStorage = [];
    // } else {
    //     itemFromStorage = JSON.parse(localStorage.getItem('items'));
    // }

    // Add new item to array
    itemFromStorage.push(item);

    // Convert to JSON string and set to local storage 
    localStorage.setItem('items', JSON.stringify(itemFromStorage));
}

function getItemToStorage(item) {
    let itemFromStorage;

    if (localStorage.getItem('items') === null) {
        itemFromStorage = [];
    } else {
        itemFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemFromStorage;
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item) {
    isEditMode = true;
    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = `<i class='fa-solid fa-pen'></i>
    Update Item`;
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;
}

function removeItem(item) {

    // console.log('item ==>',item);
    if (confirm('Are you sure?')) {
        // Remove item from DOM
        item.remove();

        // Remove item from storage
        // console.log('textContent =>',item.textContent);

        removeItemFromStorage(item.textContent);
        checkUI();

    }

    // function removeItemFromStorage(item) {
    //     let itemFromStorage =  getItemToStorage();

    //     // Filter out item to be removed
    //     itemFromStorage = itemFromStorage.filter((i) => i !== item);
    //     console.log('itemFromStorage ==>',itemFromStorage);

    //     // Re-set to localStorage
    //     localStorage.setItem('items',JSON.stringify(itemFromStorage));



    // }    

    function removeItemFromStorage(item) {
        let itemFromStorage = getItemToStorage();
        console.log('item is', item);

        // Filter out item to be removed
        i = itemFromStorage.map((i) => {
            return i !== item;
        })
        console.log('i ==>', i);

        // Re-set to localstorage
        localStorage.setItem('items', JSON.stringify(i));
    }



    // console.log(event.target.parentElement);
    // event.target.remove();

    // if(event.target.parentElement.classList.contains('remove-item')) {
    //     if(confirm('Are you sure?')) {
    //         event.target.parentElement.parentElement.remove();
    //         checkUI();
    //     }
    // }
}

function clearItem() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    // clear from localstorage
    localStorage.removeItem('items');

    checkUI();
}


function filterItem(e) {
    const items = itemList.querySelectorAll('li')
    const text = e.target.value.toLowerCase();

    // console.log('text is ==>',text);
    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
            // console.log(true);

        } else {
            item.style.display = 'none';

            // console.log(false);

        }
        // console.log('itemName is =>',itemName);

    })

}



function checkUI() {

    const items = itemList.querySelectorAll('li')
    // console.log('items ==>',items);

    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}



// Event Listeners
// Initialize App

function init() {
    itemForm.addEventListener('submit', addItem)
    itemList.addEventListener('click', onClickItem)
    clearBtn.addEventListener('click', clearItem)
    itemFilter.addEventListener('input', filterItem)
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
}
init();
