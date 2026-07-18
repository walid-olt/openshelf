import mongoose, { Schema } from "mongoose"
import { Book } from "../types/book"

const bookModelSchema = new Schema<Book>(
  {
    title: { type: String, required: true, maxlength: 100 },
    author: { type: String, required: true, maxlength: 50 },
    isbn: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    description: {
      type: String,
      required: true,
      minlength: 16,
      maxlength: 500,
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
)

const BookModel =
  (mongoose.models.Book as mongoose.Model<Book>) ||
  mongoose.model<Book>("Book", bookModelSchema)

export default BookModel
