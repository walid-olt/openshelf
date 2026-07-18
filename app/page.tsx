import { BookCatalog } from "@/components/book-catalog"

export default function CatalogPage() {
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

        <BookCatalog />
      </main>
    </div>
  )
}
