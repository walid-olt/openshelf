import { z } from "zod"
import {
  bookSchema,
  bookCreateSchema,
  bookUpdateSchema,
} from "../schemas/book.schema"

export type Book = z.infer<typeof bookSchema>
export type BookCreateDto = z.infer<typeof bookCreateSchema>
export type BookUpdateDto = z.infer<typeof bookUpdateSchema>
