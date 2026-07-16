"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeftIcon } from "@phosphor-icons/react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BookForm } from "@/components/book-form"
import { Button } from "@/components/ui/button"
import type { BookFormValues } from "@/components/book-form"
import { PLACEHOLDER_BOOKS } from "@/lib/placeholder-books"

export default function EditBookPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()

  const book = PLACEHOLDER_BOOKS.find((b) => b.id === params.id)

  if (!book) {
    return (
      <div className="flex min-h-svh flex-col">
        <Header />
        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-16">
          <p className="text-sm text-muted-foreground">Book not found.</p>
          <Button
            variant="ghost"
            size="sm"
            render={<Link href="/">Back to catalog</Link>}
            nativeButton={false}
            className="mt-2"
          />
        </main>
        <Footer />
      </div>
    )
  }

  const handleSubmit = async (data: BookFormValues) => {
    console.log("Update book:", params.id, data)
    router.push(`/books/${params.id}`)
  }

  return (
    <div className="flex min-h-svh flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-4 py-8">
        <Link
          href={`/books/${book.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Back to book
        </Link>

        <h1 className="font-serif text-xl font-bold tracking-tight text-foreground">
          Edit book
        </h1>

        <BookForm
          mode="edit"
          initialData={book}
          onSubmit={handleSubmit}
        />
      </main>

      <Footer />
    </div>
  )
}
