const form = document.querySelector('.input-form');

let library = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary() {
    const title = document.querySelector('title')
    console.log(title);
}

/* 
    function open form {
        change scale
    }
*/

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