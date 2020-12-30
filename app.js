// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// UI Prototype, add book to list
UI.prototype.addBookToList = function(book) {
  let list = document.getElementById('book-list');
  let row = document.createElement('tr');
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="" class="delete">X</a></td>`
    list.appendChild(row);
}

// UI Prototype, clear fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Event Listener
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  // Instantiate Book
  const book = new Book(title, author, isbn);

  // Instaniate UI
  const ui = new UI();
  
  // Add book to list
  ui.addBookToList(book);
  ui.clearFields();

  e.preventDefault();
});
