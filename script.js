// Getting all necessary DOM nodes
const module = document.querySelector('.module');
const addButton = document.querySelector('[data-form-target]');
const closeButton = document.querySelector('[data-close-button]');
const overlay = document.querySelector('#overlay');
const form = document.querySelector('#form');
const bookshelf = document.querySelector('.bookshelf');

// Setting EventListeners
addButton.addEventListener('click', showModule);
closeButton.addEventListener('click', closeModule);
form.addEventListener('submit', addBookToLibrary);
overlay.addEventListener('click', () => {
  const modules = document.querySelectorAll('.module.active');
  modules.forEach((module) => {
    closeModule(module);
  });
});

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
let library = JSON.parse(localStorage.getItem('library')) || [];

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
  saveLocal();
  updateBookshelf();
  form.reset();
  closeModule();
}

function makeBookOnShelf(book, i) {
  let bookNode = document.createElement('div');
  bookNode.classList.add('book');
  bookNode.setAttribute('data-index', `${i}`);

  let bookContentNode = document.createElement('div');
  bookContentNode.classList.add('book-content');

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

  bookNode.appendChild(bookContentNode);
  bookContentNode.appendChild(titleNode);
  bookContentNode.appendChild(authorNode);
  bookContentNode.appendChild(pagesNode);
  bookContentNode.appendChild(statusNode);
  bookNode.appendChild(updateButton);
  bookNode.appendChild(deleteButton);
  bookshelf.appendChild(bookNode);

  updateButton.addEventListener('click', () => {
    changeStatus(book, statusNode);
  });

  deleteButton.addEventListener('click', () => {
    deleteBook(bookNode);
  });
}

function updateBookshelf() {
  bookshelf.innerHTML = '';
  library.forEach(function (book, i) {
    makeBookOnShelf(book, i);
  });
}

updateBookshelf();

// Helper functions
function changeStatus(book, statusNode) {
  if (statusNode.textContent === 'Status: Read') {
    statusNode.textContent = 'Status: Not read';
    book.status = 'Not read';
    saveLocal();
  } else {
    statusNode.textContent = 'Status: Read';
    book.status = 'Read';
    saveLocal();
  }
}

function deleteBook(bookNode) {
  bookshelf.removeChild(bookNode);
  library.splice(bookNode, 1);
  saveLocal();
}

function limitAlert() {
  alert('Too much books! Delete some books from library');
}

function saveLocal() {
  localStorage.setItem('library', JSON.stringify(library));
}
