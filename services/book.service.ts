import dbConnect from "@/lib/mongodb"
import type { Book, BookCreateDto, BookUpdateDto } from "@/types/book"
import type { QueryFilter } from "mongoose"
import BookModel from "@/models/book.model"

export type BookFilters = {
  search?: string
  category?: string
  available?: boolean
}

export async function getBooks(filters: BookFilters) {
  await dbConnect()
  try {
    const query: QueryFilter<Book> = {}

    if (filters.search) {
      const regex = new RegExp(filters.search, "i")
      query.$or = [{ title: regex }, { author: regex }]
    }

    if (filters.category) {
      query.category = filters.category as Book["category"]
    }

    if (filters.available !== undefined) {
      query.available = filters.available
    }

    return await BookModel.find(query)
  } catch (err) {
    console.error("Error fetching books:", err)
    throw new Error("Failed to fetch books")
  }
}

export async function getBookById(id: string) {
  await dbConnect()
  try {
    const book = await BookModel.findById(id)
    return book
  } catch (err) {
    console.error(`Error fetching book with id ${id}:`, err)
    throw new Error(`Failed to fetch book with id ${id}`)
  }
}

export async function createBook(bookData: BookCreateDto) {
  await dbConnect()
  try {
    const created = await BookModel.create(bookData)
    return created
  } catch (err) {
    console.error("Error creating book:", err)
    return null
  }
}

export async function deleteBookById(id: string) {
  await dbConnect()
  try {
    const deleted = await BookModel.findByIdAndDelete(id)
    return deleted
  } catch (err) {
    console.error("Error deleting book:", err)
    return null
  }
}

export async function updateBook(id: string, data: BookUpdateDto) {
  await dbConnect()
  try {
    const updated = await BookModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    })
    return updated
  } catch (err) {
    console.error("Error updating book:", err)
    return null
  }
}
