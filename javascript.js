const myLibrary = [];

// --- Book object constructor ---

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if (this.read) {
            return `${this.title} by ${this.author}, ${this.pages} pages, read`;
        } else {
            return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
        }
    };
}

// --- Add book to library function ---

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// --- Display books in page function ---

function displayBooks() {
    const libraryDiv = document.querySelector(".library");
    const booksArray = document.createElement("div");
    booksArray.className = "books-array";

    myLibrary.forEach(element => {
        const card = document.createElement("div");
        card.className = "card";
        const cardTitle = document.createElement("div");
        const cardAuthor = document.createElement("div");
        const cardPages = document.createElement("div");
        const cardRead = document.createElement("button");
        cardTitle.textContent = element.title;
        cardAuthor.textContent = element.author;
        cardPages.textContent = element.pages;
        if (element.read) {
            cardRead.textContent = "Read";
        } else {
            cardRead.textContent = "Not Read";
        }
        card.appendChild(cardTitle);
        card.appendChild(cardAuthor);
        card.appendChild(cardPages);
        card.appendChild(cardRead);
        booksArray.appendChild(card);
    });

    libraryDiv.replaceChildren(booksArray);
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
    // dialog.close();

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
    displayBooks();
});

const book1 = new Book("Artemis Fowl", "Eoin Colfer", 250, true);
const book2 = new Book("The Hobbit", "J.R.R. Tolkien", 400, false);
const book3 = new Book("La Ciudad de las Bestias", "Isabel Allende", 200, true);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
displayBooks();