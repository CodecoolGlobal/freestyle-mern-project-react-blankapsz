import mongoose from "mongoose";
import express from "express";
import Book from './model/Book.js'

const app = express();
app.use(express.json());

app.post('/api/books', (req, res) => {
  console.log(req.body);
  const {
    imageUrl,
    title,
    author,
    year,
    review,
  } = req.body;

  const newBook = new Book({
    imageUrl,
    title,
    author,
    year,
    review,
  })
  newBook.save()
    .then(book => res.json(book))
    .catch(error => res.status(400).json({success: false}))

})

app.delete('/api/books/:id', async (req, res) => {
  const id = req.params.id;
  const book = await Book.findOneAndDelete({ _id : id})
  res.send(book)
})

app.get("/api/book", async (req, res) => {
    try{
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

app.patch("/api/books/:id", async (req, res, next) => {
  console.log(req.body);
  try {
    const {id}= req.params
    const book = await Book.findByIdAndUpdate(
      id, req.body, {new: true}
      );
      console.log(req.params);
    return res.json(book);
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
