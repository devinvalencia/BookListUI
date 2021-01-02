class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  constructor(){}

  addBooktoList(book) {
    let list = document.getElementById('book-list');
    let row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="" class="delete">X</a></td>`
      list.appendChild(row);
  }

  deleteBook(target) {
    if (target.className == 'delete') {
      // Want to go from child a tag, to parent td tag, to finally parent tr tag
      target.parentElement.parentElement.remove();
    }
    let ui = new UI();
    ui.showAlert('Book Deleted!','success');
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  showAlert(message, className) {
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
}

class Store {

  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks(){
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui = new UI();
      ui.addBooktoList(book);
    });
  }

  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn){
    const books = Store.getBooks();

    books.forEach(function(book, index){
        if(book.isbn == isbn) {
          books.splice(index, 1);
        }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM load event
document.addEventListener('DOMContentLoaded',Store.displayBooks());

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  const book = new Book(title, author, isbn);
  const ui = new UI();

  ui.addBooktoList(book);
  Store.addBook(book);
  ui.clearFields();
  e.preventDefault();
});

// Even Listener for Delete
// Have to grab parent id first, 
document.getElementById('book-list').addEventListener('click', function(e){
  let ui = new UI();
  ui.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent); 
  e.preventDefault();
});