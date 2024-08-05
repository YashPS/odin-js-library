let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const libraryDiv = document.getElementById('library');
  libraryDiv.innerHTML = ''; // Clear previous content

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    
    const bookInfo = document.createElement('p');
    bookInfo.innerHTML = `<strong>${book.title}</strong> by ${book.author} <br> ${book.pages} pages`;
    bookCard.appendChild(bookInfo);
    
    const readStatus = document.createElement('p');
    readStatus.textContent = book.read ? "Read" : "Not Read";
    bookCard.appendChild(readStatus);
    
    const toggleReadButton = document.createElement('button');
    toggleReadButton.textContent = "Toggle Read";
    toggleReadButton.classList.add('toggle-read');
    toggleReadButton.onclick = () => {
      book.toggleRead();
      displayBooks();
    };
    bookCard.appendChild(toggleReadButton);

    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.classList.add('remove');
    removeButton.onclick = () => {
      myLibrary.splice(index, 1);
      displayBooks();
    };
    bookCard.appendChild(removeButton);

    libraryDiv.appendChild(bookCard);
  });
}

document.getElementById('newBookButton').onclick = () => {
  const form = document.getElementById('bookForm');
  form.classList.toggle('hidden');
};

document.getElementById('bookForm').onsubmit = (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  document.getElementById('bookForm').reset();
};
