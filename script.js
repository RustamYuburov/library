// Getting all necessary DOM nodes
const module = document.querySelector('.module');
const addButton = document.querySelector('[data-form-target]');
const closeButton = document.querySelector('[data-close-button]');
const overlay = document.querySelector('#overlay');
const submitButton = document.querySelector('.submit-button');
const form = document.querySelector('#form');
const bookshelf = document.querySelector('.bookshelf');

// Setting EventListeners
addButton.addEventListener('click', showModule);
closeButton.addEventListener('click', closeModule);
submitButton.addEventListener('click', addBookToLibrary)
overlay.addEventListener('click', () => {
    const modules = document.querySelectorAll('.module.active');
    modules.forEach(module => {
        closeModule(module);
    })
})

// Function for open & close module
function showModule() {
    module.classList.add('active');
    overlay.classList.add('active');
    addButton.classList.add('rotated');
}

function closeModule() {
    module.classList.remove('active');
    overlay.classList.remove('active');
    addButton.classList.remove('rotated');
}

// Main logic
let library = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}


function createNewBook() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const status = document.querySelector('#status').value;
    return new Book(title, author, pages, status);
}

function addBookToLibrary(e) {
    e.preventDefault();
    if (library.length >= 5) return limitAlert();
    library.push(createNewBook());
    updateBookshelf();
    form.reset()
    closeModule();
}

function makeBookOnShelf(book, i) {
    let div = document.createElement('div');
    div.classList.add('book');
    div.setAttribute('data-index', `${i}`);

    let bookNode = document.createElement('div');
    bookNode.classList.add('book-content');
    
    let titleNode = document.createElement('h3');
    titleNode.textContent = `Title: ${book.title}`;
    
    let authorNode = document.createElement('h3');
    authorNode.textContent = `Written by: ${book.author}`;
    
    let pagesNode = document.createElement('h3');
    pagesNode.textContent = `Number of pages: ${book.pages}`;
    
    let statusNode = document.createElement('h3');
    statusNode.classList.add('status-book');
    statusNode.textContent = `Status: ${book.status}`;
    
    let updateButton = document.createElement('button');
    updateButton.classList.add('update-book');
    updateButton.textContent = 'Update';
    
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-book');
    deleteButton.textContent = 'Delete';
    
    div.appendChild(bookNode);
    bookNode.appendChild(titleNode);
    bookNode.appendChild(authorNode);
    bookNode.appendChild(pagesNode);
    bookNode.appendChild(statusNode);
    div.appendChild(updateButton);
    div.appendChild(deleteButton);
    bookshelf.appendChild(div);
}

function updateBookshelf() {
    bookshelf.innerHTML = ''
    library.forEach(function (book, i) {
        makeBookOnShelf(book, i);
    })
}


// Helper functions
function limitAlert() {
    alert('Too much books! Delete some books from library');
}
// function saveLocal() {
//     localStorage.setItem("library", JSON.stringify(library));
//   }

console.log(library);
