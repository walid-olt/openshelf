import Link from "next/link"
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr"
import { CreateBookForm } from "@/components/book-create-form"

export default function CreateBookPage() {
  return (
    <div className="flex min-h-svh flex-col">
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

        <CreateBookForm />
      </main>
    </div>
  )
}
