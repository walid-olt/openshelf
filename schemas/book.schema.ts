import { z } from "zod"
import { isbnSchema } from "./isbn.schema"
import { BOOK_GENRES } from "@/lib/constants/BOOK_GENRES"
export const bookSchema = z.object({
  id: z.string().length(24, "Invalid ID format"),
  slug: z.string(),
  title: z
    .string()
    .nonempty("Title is required")
    .max(100, "Title must be less than 100 characters"),
  author: z
    .string()
    .nonempty("Author is required")
    .max(50, "Author must be less than 50 characters"),
  isbn: isbnSchema,
  category: z.enum(BOOK_GENRES),
  publicationYear: Date,
  description: z
    .string()
    .nonempty("Description is required")
    .min(16, "Description must be at least 16 characters")
    .max(500, "Description must be less than 500 characters"),
  available: z.boolean().default(true),
  createdAt: Date,
  updatedAt: Date,
})

// derive the dtos
export const bookUpdateSchema = bookSchema
  .omit({
    id: true,
  })
  .partial()

export const bookCreateSchema = bookSchema.omit({
  id: true,
})
