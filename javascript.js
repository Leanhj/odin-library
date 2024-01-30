const myLibrary = [];

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

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    const libraryDiv = document.querySelector(".library");
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
        libraryDiv.appendChild(card);
    });
}

const book1 = new Book("Artemis Fowl", "Eoin Colfer", 250, true);
const book2 = new Book("The Hobbit", "J.R.R. Tolkien", 400, false);
const book3 = new Book("La Ciudad de las Bestias", "Isabel Allende", 200, true);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
displayBooks();