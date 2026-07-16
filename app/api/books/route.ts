import { createResponse } from "@/lib/response"
import { formatZodErrors } from "@/lib/utils"
import { bookCreateSchema } from "@/schemas/book.schema"
import { createBook, getBooks } from "@/services/book.service"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const search = searchParams.get("search") || undefined
  const category = searchParams.get("category") || undefined
  const availableParam = searchParams.get("available")
  const available =
    availableParam !== null ? availableParam === "true" : undefined
  const page = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : undefined
  const limit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : undefined

  const result = await getBooks(
    { search, category, available },
    { page, limit }
  )

  return createResponse({ data: result, success: true, status: 200 })
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
