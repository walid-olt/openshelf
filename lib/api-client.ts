import ky, { isHTTPError } from "ky"
import type { Book, BookCreateDto, BookUpdateDto } from "@/types/book"
import type { ApiResponse, BookQueryParams } from "@/types/response"

const client = ky.create({
  prefix: "/api",
  timeout: 10000,
  hooks: {
    beforeError: [
      (state) => {
        const { error } = state
        if (isHTTPError(error) && error.data) {
          const body = error.data as ApiResponse<never>
          if (!body.success) {
            error.message = body.error
          }
        }
        return error
      },
    ],
  },
})

export class BooksApi {
  static async getAll(
    params?: BookQueryParams
  ): Promise<ApiResponse<Book[]>> {
    const searchParams = new URLSearchParams()
    if (params?.search) searchParams.set("search", params.search)
    if (params?.category) searchParams.set("category", params.category)
    if (params?.available !== undefined)
      searchParams.set("available", String(params.available))

    return client
      .get("books", { searchParams })
      .json<ApiResponse<Book[]>>()
  }

  static async getById(id: string): Promise<ApiResponse<Book>> {
    return client.get(`books/${id}`).json<ApiResponse<Book>>()
  }

  static async create(data: BookCreateDto): Promise<ApiResponse<Book>> {
    return client.post("books", { json: data }).json<ApiResponse<Book>>()
  }

  static async update(
    id: string,
    data: BookUpdateDto
  ): Promise<ApiResponse<Book>> {
    return client
      .put(`books/${id}`, { json: data })
      .json<ApiResponse<Book>>()
  }

  static async delete(id: string): Promise<ApiResponse<Book>> {
    return client.delete(`books/${id}`).json<ApiResponse<Book>>()
  }
}
