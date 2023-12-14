import { useState, useEffect } from "react";
import "./Collection.css";

async function fetchUsers() {
  const response = await fetch("/api/users");
  const users = await response.json();
  return users;
}

async function updateBorrower(userId, id) {
  const response = await fetch(`/api/books/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({borrower: userId})
  });
  console.log(response);
}

export default function Collection() {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState(null);
  
  console.log(books);

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch("/api/book");
      const books = await response.json();
      setBooks(books);
    }
    fetchBooks();
    fetchUsers().then((users) => {
      setUsers(users);
    });
    setIsLoading(false);
  }, []);

  function handleBorrowerChange(value, i, id) {
    const updatedBooks = [...books];
    updatedBooks[i].borrower = value;
    setBooks(updatedBooks);
    updateBorrower(value, id);
  }

  return (
    <>
      <h1>My Book Collection</h1>
      {isLoading ? (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="books">
          {books.map((book, i) => (
            <div key={book._id} className="book">
              <img src={book.cover} alt="cover" height={400} />
              <h2>{book.title}</h2>
              <h3>Author: {book.author}</h3>
              <h3>Published in: {book.year}</h3>
              <p>Review: {book.review}</p>
              <h4>Owner: {book.user.name}</h4>
              <label>Borrowed by:</label>
              <select
                value={book.borrower ?? ""}
                onChange={(e) =>
                  handleBorrowerChange(e.target.value, i, book._id)
                }
              >
                <option value={""} >
                  Select a user
                </option>
                {users &&
                  users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
