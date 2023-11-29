import { useState, useEffect } from "react";

export default function Edit() {
  const [cover, setCover] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [review, setReview] = useState("");
  const [newCover, setNewCover] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newReview, setNewReview] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch("/api/book");
      const books = await response.json();
      setBooks(books);
    }
    fetchBooks();
  }, []);

  function handleBookSelect(e) {
    const selectedBookTitle = e.target.value;
    const book = books.find((book) => book.title === selectedBookTitle);
    setSelectedBook(book);
    setNewCover(book.cover);
    setNewTitle(book.title);
    setNewAuthor(book.author);
    setNewYear(book.year);
    setNewReview(book.review);
  }

  function handleEdit() {
    setIsEdit(true);
  }

 
  async function handleDelete(e, id) {
    console.log(id)
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        const deletedBook = await response.json();
        setBooks((books) => {
          return books.filter((book) => book._id !== id)
        })
        console.log(deletedBook);
      } else {
        console.error('Failed to delete the book');
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    console.log("from edit page, hanndleSubmit");
    e.preventDefault();

    const bookPost = {
      cover,
      title,
      author,
      year,
      review,
    };

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        body: JSON.stringify(bookPost),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const addedBook = await response.json();
        console.log("New book added", addedBook);
      } else {
        console.error("Failed to add the book");
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function handleUpdate(e, id) {
    e.preventDefault();
    const bookUpdate = {
      cover: newCover,
      title: newTitle,
      author: newAuthor,
      year: newYear,
      review: newReview,
    };
    try {
      await fetch(`/api/books/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookUpdate)
      })
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <div>
      <form className="upload" onSubmit={handleSubmit}>
        <h3 className="upload-head">Add a book to your collection</h3>

        <label className="upload-labels">Cover image URL: </label>
        <input
          type="text"
          onChange={(e) => setCover(e.target.value)}
          value={cover}
        />

        <label className="upload-labels">Title: </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label className="upload-labels">Author: </label>
        <input
          type="text"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />

        <label className="upload-labels">Year: </label>
        <input
          type="number"
          onChange={(e) => setYear(e.target.value)}
          value={year}
        />

        <label className="upload-labels">My description: </label>
        <input
          type="text"
          onChange={(e) => setReview(e.target.value)}
          value={review}
        />

        <button className="addBook">Add this book</button>
      </form>
      <select onChange={handleBookSelect} value={selectedBook ? selectedBook.title : ""}>
        <option value="" disabled>Select a book</option>
        {books.map((book, index) => (
          <option key={book.id || index} onClick={() => setSelectedBook(book)}>
            {book.title}
          </option>
        ))}
      </select>
      {isEdit ? (
        <div>
          <form className="upload" onSubmit={(e) => handleUpdate(e, selectedBook._id)}>
        <h3 className="upload-head">Add a book to your collection</h3>

        <label className="upload-labels">Cover image URL: </label>
        <input
          type="text"
          value={newCover || selectedBook.cover}
          onChange={(e) => setNewCover(e.target.value)}
          
        />

        <label className="upload-labels">Title: </label>
        <input
          type="text"
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle || selectedBook.title}
        />

        <label className="upload-labels">Author: </label>
        <input
          type="text"
          onChange={(e) => setNewAuthor(e.target.value)}
          value={newAuthor || selectedBook.author}
        />

        <label className="upload-labels">Year: </label>
        <input
          type="number"
          onChange={(e) => setNewYear(e.target.value)}
          value={newYear || selectedBook.year}
        />

        <label className="upload-labels">My description: </label>
        <input
          type="text"
          onChange={(e) => setNewReview(e.target.value)}
          value={newReview || selectedBook.review}
        />

        <button className="addBook">Save changes</button>
      </form>
        </div>
      ) : (
      selectedBook && (
        <div>
          <h1>{selectedBook.title}</h1>
          <h3>Author: {selectedBook.author}</h3>
          <h3>Published in: {selectedBook.year}</h3>
          <p>Review: {selectedBook.review}</p>
          <button onClick={handleEdit}>EDIT</button>
          <button onClick={(e) => handleDelete(e, selectedBook._id)}>DELETE</button>
        </div>

      )
      )}
    </div>
  );
}


