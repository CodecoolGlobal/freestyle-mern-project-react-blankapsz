import mongoose from "mongoose";


const {Schema, model} = mongoose;

const bookSchema = new Schema({
    cover: String,
    title: String,
    author: String,
    year: Number,
    review: String,
    
},)

const Book = model('Book', bookSchema);
export default Book;