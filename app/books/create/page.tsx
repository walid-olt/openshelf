"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeftIcon } from "@phosphor-icons/react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BookForm } from "@/components/book-form"
import type { BookFormValues } from "@/components/book-form"

export default function CreateBookPage() {
  const router = useRouter()

  const handleSubmit = async (data: BookFormValues) => {
    console.log("Create book:", data)
    router.push("/")
  }

  return (
    <div className="flex min-h-svh flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Back to catalog
        </Link>

        <h1 className="font-serif text-xl font-bold tracking-tight text-foreground">
          Add a new book
        </h1>

        <BookForm mode="create" onSubmit={handleSubmit} />
      </main>

      <Footer />
    </div>
  )
}
