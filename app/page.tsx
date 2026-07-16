"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpenTextIcon } from "@phosphor-icons/react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { SearchBar } from "@/components/search-bar"
import { Filter } from "@/components/filter"
import { BookCard } from "@/components/book-card"
import { Button } from "@/components/ui/button"
import { PLACEHOLDER_BOOKS } from "@/lib/placeholder-books"

export default function CatalogPage() {
  const [books, setBooks] = useState(PLACEHOLDER_BOOKS)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const filtered = books.filter((book) => {
    const matchesSearch =
      search === "" ||
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === "all" ||
      (filter === "available" && book.available) ||
      (filter === "borrowed" && !book.available)
    return matchesSearch && matchesFilter
  })

  const handleDelete = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id))
  }

  return (
    <div className="flex min-h-svh flex-col">
      <Header />

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
          <SearchBar value={search} onChange={setSearch} />
          <Filter value={filter} onValueChange={setFilter} />
        </div>

        {filtered.length === 0 ? (
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
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
