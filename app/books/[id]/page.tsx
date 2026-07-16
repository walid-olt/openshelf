"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeftIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useDeleteDialog } from "@/components/delete-dialog-context"
import { PLACEHOLDER_BOOKS } from "@/lib/placeholder-books"

export default function BookDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { openDeleteDialog } = useDeleteDialog()

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

  return (
    <div className="flex min-h-svh flex-col">
      <Header />

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
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {book.category}
            </span>

            <h1 className="font-serif text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
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

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                nativeButton={false}
                render={
                  <Link href={`/books/edit/${book.id}`}>
                    <PencilSimpleIcon />
                    Edit
                  </Link>
                }
              />
              <Button
                size="sm"
                variant="destructive"
                onClick={() =>
                  openDeleteDialog(book.id, book.title, () =>
                    router.push("/"),
                  )
                }
              >
                <TrashIcon />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
