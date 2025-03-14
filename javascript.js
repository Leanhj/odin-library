const myLibrary = [];

// --- Book object constructor ---

// function Book(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
//     this.info = function() {
//         if (this.read) {
//             return `${this.title} by ${this.author}, ${this.pages} pages, read`;
//         } else {
//             return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
//         }
//     };
//     this.readStatus = function() {
//         this.read = !(this.read);
//     }
// }

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        if (this.read) {
            return `${this.title} by ${this.author}, ${this.pages} pages, read`;
        } else {
            return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
        }
    }

    readStatus() {
        this.read = !(this.read);
    }
}

// --- Add book to library function ---

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// --- Display books in page function ---

function render() {
    const libraryDiv = document.querySelector(".library");
    const booksArray = document.createElement("div");
    booksArray.className = "books-array";

    for (let i = 0; i < myLibrary.length; i++) {
        createBookCard(booksArray, myLibrary[i], i);
    }

    libraryDiv.replaceChildren(booksArray);
}

function createBookCard(bookNodes, book, idx) {
    const card = document.createElement("div");
    card.className = "card";
    const cardTitle = document.createElement("div");
    const cardAuthor = document.createElement("div");
    const cardPages = document.createElement("div");
    const buttonsContainer = document.createElement("div");
    const cardRead = document.createElement("button");
    cardRead.classList = "read-button";
    const cardRemove = document.createElement("button");
    cardRemove.textContent = "Remove";
    cardRemove.className = "remove";

    cardTitle.textContent = book.title;
    cardAuthor.textContent = book.author;
    cardPages.textContent = book.pages;
    if (book.read) {
        cardRead.textContent = "Read";
        cardRead.className = "read";
    } else {
        cardRead.textContent = "Not Read";
        cardRead.className = "not-read";
    }

    cardRemove.addEventListener("click", () => {
        myLibrary.splice(idx, 1);
        render();
    });

    cardRead.addEventListener("click", () => {
        book.readStatus();
        render();
    });

    card.appendChild(cardTitle);
    card.appendChild(cardAuthor);
    card.appendChild(cardPages);
    buttonsContainer.appendChild(cardRead);
    buttonsContainer.appendChild(cardRemove);
    card.appendChild(buttonsContainer);
    bookNodes.appendChild(card);
}

// --- New book dialog ---

const newBookButton = document.querySelector(".new-book");
const dialog = document.querySelector(".dialog");

newBookButton.addEventListener("click", () => {
    dialog.showModal();
});

const cancelButton = document.querySelector(".cancel");

cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const myFormData = new FormData(e.target);

    const formDataObj = Object.fromEntries(myFormData.entries());
    console.log(formDataObj);
    dialog.close();

    let readValue;
    if (formDataObj.hasOwnProperty("book-read")) {
        readValue = true;
    } else {
        readValue = false;
    }
    const newBook = new Book(formDataObj["book-title"],
                            formDataObj["book-author"],
                            formDataObj["book-pages"],
                            readValue);

    myLibrary.push(newBook);
    render();
});

const titleField = document.getElementById("book-title");
const authorField = document.getElementById("book-author");
const pagesField = document.getElementById("book-pages");
const addBookButton = document.querySelector(".add-book");

function checkFormValidity() {
    if (titleField.validity.valueMissing || authorField.validity.valueMissing || pagesField.validity.valueMissing) {
        addBookButton.disabled = true;
    } else {
        addBookButton.disabled = false;
    }
}

window.onload = () => {
    titleField.oninput = checkFormValidity;
    authorField.oninput = checkFormValidity;
    pagesField.oninput = checkFormValidity;
}

const book1 = new Book("Artemis Fowl", "Eoin Colfer", 250, true);
const book2 = new Book("The Hobbit", "J.R.R. Tolkien", 400, false);
const book3 = new Book("La Ciudad de las Bestias", "Isabel Allende", 200, true);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
render();