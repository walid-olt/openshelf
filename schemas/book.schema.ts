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
  publicationYear: z
    .number()
    .int()
    .min(1000, "Publication year must be a valid year")
    .max(new Date().getFullYear(), "Publication year cannot be in the future"),

  description: z
    .string()
    .nonempty("Description is required")
    .min(16, "Description must be at least 16 characters")
    .max(500, "Description must be less than 500 characters"),
  available: z.boolean().nonoptional().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// derive the dtos
export const bookUpdateSchema = bookSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial()

export const bookCreateSchema = bookSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
