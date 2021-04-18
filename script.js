
const form = document.querySelector('.form');
const addButton = document.querySelector('.add-button');
const closeButton = document.querySelector('.close-btn');

addButton.addEventListener('click', showForm);
closeButton.addEventListener('click', closeForm);


function showForm() {
    form.style.display = 'block';
    addButton.classList.add('rotated');
}

function closeForm() {
    form.style.display = 'none';
    addButton.classList.remove('rotated');
}

let library = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

/* 
    function create book to shelf from array{
        foreach book in library makebook
    }
*/

/* 
function submit {
    take input from form;
    create book from input;
    clean input form;
    pop out form
}
*/ 