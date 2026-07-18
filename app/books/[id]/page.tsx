"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeftIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BooksApi } from "@/lib/api-client"
import { BookActions } from "@/components/book-actions"
import { PageLoader } from "@/components/page-loader"
import { ErrorState } from "@/components/error-state"

export default function BookDetailPage() {
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
        message="The book you're looking for doesn't exist or has been removed."
      />
    )
  }

  const book = response.data

  return (
    <div className="flex min-h-svh flex-col">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Back to catalog
        </Link>

        <Card className="overflow-visible border-l-4 border-l-accent">
          <CardContent className="space-y-4">
            <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {book.category}
            </span>

            <h1 className="font-serif text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-3xl">
              {book.title}
            </h1>

            <p className="text-sm text-muted-foreground">{book.author}</p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
              <div>
                <span className="text-muted-foreground">ISBN</span>
                <p className="mt-0.5 font-medium">{book.isbn}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Year</span>
                <p className="mt-0.5 font-medium">{book.publicationYear}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Status</span>
                <div className="mt-0.5">
                  <Badge variant={book.available ? "available" : "borrowed"}>
                    {book.available ? "Available" : "Borrowed"}
                  </Badge>
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-foreground/80">
              {book.description}
            </p>

            <Separator />

            <BookActions book={book} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
