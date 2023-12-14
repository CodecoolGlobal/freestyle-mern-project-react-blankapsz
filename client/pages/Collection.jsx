import { useState, useEffect } from "react";
import "./Collection.css";

export default function Collection() {

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
    <><h1>My Book Collection</h1>{isLoading ? <div className="loading"><h1>Loading...</h1></div>
     : 
     <div className="books">
    {books.map((book) => (
      <div key={book._id} className="book">
        <img src={book.cover} alt="cover" height={400} />
        <h2>{book.title}</h2>
        <h3>Author: {book.author}</h3>
        <h3>Published in: {book.year}</h3>
        <p>Review: {book.review}</p>
      </div>
    ))}
  </div>}

    </>
  );
}
