import { createResponse } from "@/lib/response"
import { formatZodErrors } from "@/lib/utils"
import { bookCreateSchema } from "@/schemas/book.schema"
import { createBook, getAllBooks } from "@/services/book.service"
import { NextRequest } from "next/server"

export async function GET() {
  //TODO: implement filtering and pagination
  const books = await getAllBooks()
  return createResponse({ data: books, success: true, status: 200 })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const { success, error, data } = bookCreateSchema.safeParse(body)
  if (!success || !data) {
    return createResponse({
      success: false,
      status: 400,
      error: "Invalid book data",
      details: formatZodErrors(error),
    })
  }

  const created = await createBook(data)

  if (!created) {
    return createResponse({
      success: false,
      status: 500,
      error: "Failed to create book",
    })
  }

  return createResponse({
    data: created,
    success: true,
    status: 201,
  })
}
