"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeftIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { EditBookForm } from "@/components/book-edit-form"
import { BooksApi } from "@/lib/api-client"

export default function EditBookPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()

  const { data: response, isPending, error } = useQuery({
    queryKey: ["books", params.id],
    queryFn: () => BooksApi.getById(params.id),
  })

  if (isPending) {
    return (
      <div className="flex min-h-svh flex-col">
        <Header />
        <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-4 py-16">
          <p className="text-sm text-muted-foreground">Loading book...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !response?.success) {
    return (
      <div className="flex min-h-svh flex-col">
        <Header />
        <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-4 py-16">
          <p className="text-sm text-muted-foreground">Book not found.</p>
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/">Back to catalog</Link>}
            className="mt-2"
          />
        </main>
        <Footer />
      </div>
    )
  }

  const book = response.data

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

        <EditBookForm book={book} />
      </main>

      <Footer />
    </div>
  )
}
