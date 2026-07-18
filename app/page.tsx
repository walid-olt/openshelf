"use client"

import Link from "next/link"
import { BookOpenTextIcon } from "@phosphor-icons/react"
import { BookCard } from "@/components/book-card"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { BooksApi } from "@/lib/api-client"

export default function CatalogPage() {
  const {
    data: response,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: () => BooksApi.getAll(),
  })

  if (isFetching) return <p>loading...</p>

  if (error || !response?.success) {
    return <p>something went wrong!</p>
  }
  console.log(response)

  const books = response.data

  return (
    <div className="flex min-h-svh flex-col">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-8">
        <section className="space-y-1">
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            OpenShelf
          </h1>
          <p className="text-sm text-muted-foreground">
            Your personal library catalog. Find a book or add one.
          </p>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* <SearchBar value={search} onChange={setSearch} /> */}
          {/* <Filter value={filter} onValueChange={setFilter} /> */}
        </div>

        {books.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <BookOpenTextIcon
              className="size-10 text-muted-foreground/40"
              weight="thin"
            />
            <p className="text-sm text-muted-foreground">
              {books.length === 0
                ? "No books yet. Add your first book."
                : "No books match your search."}
            </p>
            {books.length === 0 && (
              <Button
                render={<Link href="/books/create">Add your first book</Link>}
                nativeButton={false}
                size="sm"
              />
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book.isbn} book={book} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
