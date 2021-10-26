import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

class Main extends React.Component {

  render() {
    const { books, shelves, handleClick } = this.props;
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {shelves.map((shelf) => (
                <div key={shelf.name} className="bookshelf">
                  <h2 className="bookshelf-title">{shelf.heading}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books[shelf.name].map((book) => (
                        <Book
                          key={book.id}
                          book={book}
                          handleClick={handleClick}
                          shelf={book.shelf}
                        />
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="open-search">
            <Link className="search" to="/search">
              {" "}
              Add a book{" "}
            </Link>
          </div>
        </div>
        )
      </div>
    );
  }
}

export default Main;
