import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class Search extends React.Component {
  state = {
    books: [],
    searchText: "",
  };

  handleChange = async (e) => {
    const searchText = e.target.value;
    // const books = await BooksAPI.search(searchText);
    this.setState({ searchText });

    if (searchText == null || searchText.trim() === "") {
      setTimeout(() => {
        this.setState({ books: [] });
      }, 1000);
    } else {
      const books = await BooksAPI.search(searchText);
      if (Array.isArray(books)) {
        console.log(books);
        this.setState({ books });
      } else {
        this.setState({ books: [] });
      }
    }
  };

  getShelf = (id) => {
    const { shelfBooks: books } = this.props;
    const shelfBooks = [
      ...books.currentlyReading,
      ...books.wantToRead,
      ...books.read,
    ];
    // console.log(shelfBooks);
    for (let i = 0; i < shelfBooks.length; i++) {
      const shelfbook = shelfBooks[i];
      if (shelfbook.id === id) {
        return shelfbook.shelf;
      }
    }
    return false;
  };

  render() {
    const { handleClick } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.searchText}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books &&
              this.state.books.length !== 0 &&
              this.state.books.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  handleClick={handleClick}
                  shelf={this.getShelf(book.id)}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
