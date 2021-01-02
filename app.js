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

// UI ProtoType, Delete Book
UI.prototype.deleteBook = function(target) {
  if (target.className == 'delete') {
    // Want to go from child a tag, to parent td tag, to finally parent tr tag
    target.parentElement.parentElement.remove();
  }
  let ui = new UI();
  ui.showAlert('Book Deleted!','success');
}

// UI Prototype, clear fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

UI.prototype.showAlert = function(message, className) {
  let div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  //get parent, then insert
  let container = document.querySelector('.container');
  let form = document.querySelector('#book-form');
  container.insertBefore(div, form);
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// Event Listener for add book
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

// Even Listener for Delete
// Have to grab parent id first, 
document.getElementById('book-list').addEventListener('click', function(e){
  let ui = new UI();
  ui.deleteBook(e.target);
  e.preventDefault();
});