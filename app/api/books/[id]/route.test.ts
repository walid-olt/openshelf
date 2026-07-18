import { BookCreateDto } from "@/types/book"
import { DELETE, GET, PUT } from "./route"
import { NextRequest } from "next/server"
import { describe, it, expect } from "vitest"
import { createBook } from "@/services/book.service"

describe("GET /api/books/[id]", () => {
  it("should return a book by id", async () => {
    const created = await createBook({
      author: "Test Author",
      description: "Test Description",
      isbn: "1234567890",
      available: true,
      category: "Action",
      title: "Test Book",
      publicationYear: 2024,
    })
    if (!created) throw new Error("Failed to create book for test")

    const request = new NextRequest(
      `http://localhost:3000/api/books/${created.id}`,
      {
        method: "GET",
      }
    )
    const ctx = {
      params: Promise.resolve({ id: created.id }),
    }
    const response = await GET(request, ctx)
    const body = await response.json()
    expect(response.status).toBe(200)
    expect(body).toEqual({
      success: true,
      data: expect.objectContaining({
        title: "Test Book",
        author: "Test Author",
        isbn: "1234567890",
        category: "Action",
        description: "Test Description",
        publicationYear: 2024,
        available: true,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
      status: 200,
    })
  })
  it("should return 404 if book not found", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/books/000000000000000000000000",
      { method: "GET" }
    )
    const ctx = {
      params: Promise.resolve({ id: "000000000000000000000000" }),
    }
    const response = await GET(request, ctx)
    expect(response.status).toBe(404)
    const body = await response.json()
    expect(body).toEqual({
      success: false,
      status: 404,
      error: "Book not found",
    })
  })
})

describe("PUT /api/books/[id]", () => {
  it("should update a book and return it", async () => {
    const created = await createBook({
      author: "Test Author",
      description: "Test Description for update",
      isbn: "1234567890",
      available: true,
      category: "Action",
      title: "Test Book",
      publicationYear: 2024,
    })
    if (!created) throw new Error("Failed to create book for test")

    const request = new NextRequest(
      `http://localhost:3000/api/books/${created.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ title: "Updated Title", author: "Updated Author" }),
      }
    )
    const ctx = {
      params: Promise.resolve({ id: created.id }),
    }
    const response = await PUT(request, ctx)
    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body).toEqual({
      success: true,
      data: expect.objectContaining({
        title: "Updated Title",
        author: "Updated Author",
        isbn: "1234567890",
        category: "Action",
        description: "Test Description for update",
        publicationYear: 2024,
        available: true,
      }),
      status: 200,
    })
  })

  it("should return 404 if book not found", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/books/000000000000000000000000",
      {
        method: "PUT",
        body: JSON.stringify({ title: "Updated Title" }),
      }
    )
    const ctx = {
      params: Promise.resolve({ id: "000000000000000000000000" }),
    }
    const response = await PUT(request, ctx)
    expect(response.status).toBe(404)
    const body = await response.json()
    expect(body).toEqual({
      success: false,
      status: 404,
      error: "Book not found",
    })
  })

  it("should return 400 if the request body is invalid", async () => {
    const created = await createBook({
      author: "Test Author",
      description: "Test Description for validation",
      isbn: "1234567890",
      available: true,
      category: "Action",
      title: "Test Book",
      publicationYear: 2024,
    })
    if (!created) throw new Error("Failed to create book for test")

    const request = new NextRequest(
      `http://localhost:3000/api/books/${created.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ title: "" }),
      }
    )
    const ctx = {
      params: Promise.resolve({ id: created.id }),
    }
    const response = await PUT(request, ctx)
    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body).toEqual(
      expect.objectContaining({
        success: false,
        status: 400,
        error: "Invalid book data",
      })
    )
  })
})

describe("DELETE /api/books/[id]", () => {
  it("should delete a book and return it", async () => {
    const created = await createBook({
      author: "Test Author",
      description: "Test Description for delete",
      isbn: "1234567890",
      available: true,
      category: "Action",
      title: "Test Book",
      publicationYear: 2024,
    })
    if (!created) throw new Error("Failed to create book for test")

    const request = new NextRequest(
      `http://localhost:3000/api/books/${created.id}`,
      { method: "DELETE" }
    )
    const ctx = {
      params: Promise.resolve({ id: created.id }),
    }
    const response = await DELETE(request, ctx)
    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body).toEqual({
      success: true,
      data: expect.objectContaining({
        title: "Test Book",
        author: "Test Author",
        isbn: "1234567890",
      }),
      status: 200,
    })

    // verify the book is actually gone
    const getResponse = await GET(
      new NextRequest(`http://localhost:3000/api/books/${created.id}`, {
        method: "GET",
      }),
      { params: Promise.resolve({ id: created.id }) }
    )
    expect(getResponse.status).toBe(404)
  })

  it("should return 404 if book not found", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/books/000000000000000000000000",
      { method: "DELETE" }
    )
    const ctx = {
      params: Promise.resolve({ id: "000000000000000000000000" }),
    }
    const response = await DELETE(request, ctx)
    expect(response.status).toBe(404)
    const body = await response.json()
    expect(body).toEqual({
      success: false,
      status: 404,
      error: "Book not found",
    })
  })
})
