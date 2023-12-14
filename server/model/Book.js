import mongoose from "mongoose";

const { Schema, model } = mongoose;

const bookSchema = new Schema({
  cover: String,
  title: String,
  author: String,
  year: Number,
  review: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  borrower:{
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

const Book = model("Book", bookSchema);
export default Book;
