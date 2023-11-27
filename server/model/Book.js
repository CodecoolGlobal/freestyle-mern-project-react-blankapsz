import mongoose from "mongoose";


const {Schema, model} = mongoose;

const bookSchema = new Schema({
    cover: Image,
    title: String,
    author: String,
    year: Number,
    review: String,
    createdAt: Date
})

const Book = model('Book', bookSchema);
export default Book;