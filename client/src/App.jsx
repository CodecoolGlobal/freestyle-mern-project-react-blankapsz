import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  console.log(books);

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch("/api/book");
      const books = await response.json();
      setBooks(books);
    }
    fetchBooks();
    setIsLoading(false);
  }, []);

  return (
    <div>
      {books.map((book, index) => (
        <div key={book.id || index}>
          <h1>{book.title}</h1>
          <h3>Author: {book.author}</h3>
          <h3>Published in: {book.year}</h3>
          <p>Review: {book.review}</p>
        </div>
      ))}
      <Link to={"/edit"}>EDIT</Link>
    </div>
  );
}

export default App;
