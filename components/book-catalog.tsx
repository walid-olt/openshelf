"use client"

import Link from "next/link"
import { BookOpenTextIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { BooksApi } from "@/lib/api-client"
import { BookCard } from "@/components/book-card"
import { Button } from "@/components/ui/button"
import { PageLoader } from "@/components/page-loader"
import { ErrorState } from "@/components/error-state"

function BookCatalog() {
  const {
    data: response,
    isPending,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: () => BooksApi.getAll(),
  })

  if (isPending) return <PageLoader message="Loading catalog..." />

  if (error || !response?.success) {
    return (
      <ErrorState
        title="Failed to load catalog"
        message="Could not fetch books. Please try again later."
      />
    )
  }

  const books = response.data

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <BookOpenTextIcon
          className="size-10 text-muted-foreground/40"
          weight="thin"
        />
        <p className="text-sm text-muted-foreground">
          No books yet. Add your first book.
        </p>
        <Button
          render={<Link href="/books/create">Add your first book</Link>}
          nativeButton={false}
          size="sm"
        />
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book.isbn} book={book} />
      ))}
    </div>
  )
}

export { BookCatalog }
