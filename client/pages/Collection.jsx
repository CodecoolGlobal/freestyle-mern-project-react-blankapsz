import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
    <>{isLoading ? <div className="loading"><h1>Loading...</h1></div>
     : 
     <div className="books">
    {books.map((book, index) => (
      <div key={book.id || index} className="book">
        <img src={book.cover} alt="cover" height={400} />
        <h1>{book.title}</h1>
        <h3>Author: {book.author}</h3>
        <h3>Published in: {book.year}</h3>
        <p>Review: {book.review}</p>
      </div>
    ))}
    <Link to={"/edit"}>EDIT</Link>
  </div>}

    </>
  );
}
