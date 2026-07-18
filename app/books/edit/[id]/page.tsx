"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeftIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { EditBookForm } from "@/components/book-edit-form"
import { BooksApi } from "@/lib/api-client"
import { PageLoader } from "@/components/page-loader"
import { ErrorState } from "@/components/error-state"

export default function EditBookPage() {
  const params = useParams<{ id: string }>()

  const {
    data: response,
    isPending,
    error,
  } = useQuery({
    queryKey: ["books", params.id],
    queryFn: () => BooksApi.getById(params.id),
  })

  if (isPending) return <PageLoader message="Loading book..." />

  if (error || !response?.success) {
    return (
      <ErrorState
        title="Book not found"
        message="The book you're trying to edit doesn't exist or has been removed."
      />
    )
  }

  const book = response.data

  return (
    <div className="flex min-h-svh flex-col">
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

        <EditBookForm book={book} />
      </main>
    </div>
  )
}
