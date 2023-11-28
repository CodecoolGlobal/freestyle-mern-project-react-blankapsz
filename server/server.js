import mongoose from "mongoose";
import express from "express";
import Book from "./model/Book.js";

const app = express();
app.use(express.json());

app.get("/api/book", async (req, res) => {
    try{
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})


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
