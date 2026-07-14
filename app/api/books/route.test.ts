import { BookCreateDto } from "@/types/book"
import { GET, POST } from "./route"
import { NextRequest } from "next/server"
import { describe, it, expect } from "vitest"

describe("GET /api/books", () => {
  it("should return a an empty list of books", async () => {
    const response = await GET()

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body).toMatchObject({ data: [] })
  })
})

describe("POST /api/books", () => {
  it("should create a new book and return it", async () => {
    const testBook: BookCreateDto = {
      title: "test title",
      author: "test author",
      description: "test description",
      publicationYear: 2000,
      isbn: "1234567890",
      slug: "test-slug",
      category: "Action",
      available: true,
    }
    const request = new NextRequest("http://localhost:3000/api/books", {
      method: "POST",
      body: JSON.stringify(testBook),
    })

    const response = await POST(request)
    expect(response.status).toBe(201)

    const body = await response.json()

    expect(body).toMatchObject({
      success: true,
    })
    expect(body.data).toMatchObject(testBook)
  })

  it("should return 400 if the request body is invalid", async () => {
    const testBook: Partial<BookCreateDto> = {
      author: "test author",
      description: "",
      publicationYear: -1000,
    }
    const request = new NextRequest("http://localhost:3000/api/books", {
      body: JSON.stringify(testBook),
      method: "POST",
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
    const body = await response.json()

    expect(body).toMatchObject({
      status: 400,
    })
  })
})
