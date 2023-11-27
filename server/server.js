import mongoose from "mongoose";
import express from "express";


const app = express();
app.use(express.json());

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
