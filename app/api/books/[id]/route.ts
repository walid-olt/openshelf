import { createResponse } from "@/lib/response"
import { formatZodErrors } from "@/lib/utils"
import { bookUpdateSchema } from "@/schemas/book.schema"
import {
  deleteBookById,
  getBookById,
  updateBook,
} from "@/services/book.service"
import { NextRequest } from "next/server"

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/books/[id]">
) {
  const { id } = await ctx.params
  const book = await getBookById(id)
  if (!book) {
    return createResponse({
      success: false,
      status: 404,
      error: "Book not found",
    })
  }

  return createResponse({ success: true, status: 200, data: book })
}

export async function PUT(
  req: NextRequest,
  ctx: RouteContext<"/api/books/[id]">
) {
  const { id } = await ctx.params
  const body = await req.json()

  const { success, error, data } = bookUpdateSchema.safeParse(body)
  if (!success || !data) {
    return createResponse({
      success: false,
      status: 400,
      error: "Invalid book data",
      details: formatZodErrors(error),
    })
  }

  const updated = await updateBook(id, data)
  if (!updated) {
    return createResponse({
      success: false,
      status: 404,
      error: "Book not found",
    })
  }

  return createResponse({ success: true, status: 200, data: updated })
}

export async function DELETE(
  _req: NextRequest,
  ctx: RouteContext<"/api/books/[id]">
) {
  const { id } = await ctx.params
  const deleted = await deleteBookById(id)
  if (!deleted) {
    return createResponse({
      success: false,
      status: 404,
      error: "Book not found",
    })
  }

  return createResponse({ success: true, status: 200, data: deleted })
}
