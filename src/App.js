import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Main from "./Main";
import Search from "./Search";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  // Get all the books from the database
  async componentDidMount() {
    const books = await BooksAPI.getAll();
    let currentlyReading = [];
    let wantToRead = [];
    let read = [];
    books.forEach((book) => {
      if (book.shelf === "currentlyReading") {
        currentlyReading.push(book);
      }
      if (book.shelf === "wantToRead") {
        wantToRead.push(book);
      }
      if (book.shelf === "read") {
        read.push(book);
      }
    });
    this.setState({ currentlyReading, wantToRead, read });
  }

  // To handle the change of the shelf
  handleClick = async (e, book, shelf) => {
    let { ...books } = this.state;
    const oldShelf = book.shelf || shelf;
    const newShelf = e.target.value;
    if (oldShelf) {
      // Remove the book from the old shelf
      books[oldShelf] = books[oldShelf].filter((b) => b.id !== book.id);
    }
    if (newShelf === "none") {
      delete book.shelf;
    } else {
      book.shelf = newShelf;
      books[newShelf].push(book);
    }
    this.setState({
      currentlyReading: books["currentlyReading"],
      wantToRead: books["wantToRead"],
      read: books["read"],
    });
    await BooksAPI.update(book, newShelf);
  };

  render() {
    const shelves = [
      { heading: "Currently Reading", name: "currentlyReading" },
      { heading: "Want to Read", name: "wantToRead" },
      { heading: "Read", name: "read" },
    ];
    let { ...books } = this.state;
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <Main
              books={books}
              shelves={shelves}
              handleClick={this.handleClick}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <Search handleClick={this.handleClick} shelfBooks={books} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
