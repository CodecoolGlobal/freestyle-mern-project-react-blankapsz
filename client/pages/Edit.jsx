import { useState } from "react";

export default function Edit() {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    console.log("from edit page, hanndleSubmit");
    e.preventDefault();

    const bookPost = {
      imageUrl,
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

  /*    cover: Image,
    title: String,
    author: String,
    year: Number,
    review: String,
    createdAt: Date*/

  return (
    <form className="upload" onSubmit={handleSubmit}>
      <h3 className="upload-head">Add a book to your collection</h3>

      <label className="upload-labels">Cover image URL: </label>
      <input
        type="text"
        onChange={(e) => setImageUrl(e.target.value)}
        value={imageUrl}
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
  );
}
