import mongoose from "mongoose";
import express from "express";
import Book from "./model/Book.js";
import User from "./model/User.js";

const app = express();
app.use(express.json());

app.post("/api/users", (req, res) => {
  const name = req.body.name;
  console.log(name);
  const newUser = new User({
    name,
  });
  console.log(newUser);
  newUser
    .save()
    .then((user) => res.json(user))
    .catch((error) => next(error));
});

app.post("/api/books", (req, res) => {
  console.log(req.body);
  const { cover, title, author, year, review, user } = req.body;

  const newBook = new Book({
    cover,
    title,
    author,
    year,
    review,
    user,
  });
  newBook
    .save()
    .then((book) => res.json(book))
    .catch((error) => next(error));
});

app.delete("/api/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findOneAndDelete({ _id: id });
    res.send(book);
  } catch (error) {}
});

app.get("/api/book", async (req, res) => {
  try {
    const books = await Book.find().populate("user").sort({ title: "desc" });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.patch("/api/books/:id", async (req, res, next) => {
  console.log(req.body);
  try {
    const { id } = req.params;
    if (req.body.borrower) {
      const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
      console.log(req.params);
      return res.json(book);
    } else {
      console.log("valami");
      const book = await Book.findByIdAndUpdate(
        id,
        { $unset: { borrower: 1 } },
        { new: true }
      );
      return res.json(book);
    }
  } catch (err) {
    return next(err);
  }
});

mongoose
  .connect(
    "mongodb+srv://pasztorblanka:MKCjZB4gcgdmfBsf@cluster0.iovev7l.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Connected to DB and listening on port, 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
