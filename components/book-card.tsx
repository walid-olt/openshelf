"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookActions } from "@/components/book-actions"
import type { Book } from "@/types/book"

interface BookCardProps {
  book: Book
}

function BookCard({ book }: BookCardProps) {
  return (
    <article className="group/card relative">
      <Card className="relative overflow-visible border-l-4 border-l-accent pl-5 transition-all duration-200 ease-out">
        <Link
          href={`/books/${book.id}`}
          className="block"
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {book.category}
            </span>

            <p className="font-serif text-base leading-snug font-semibold text-foreground hover:underline">
              {book.title}
            </p>

            <p className="text-sm text-muted-foreground">{book.author}</p>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {book.publicationYear}
              </span>
              <Badge variant={book.available ? "available" : "borrowed"}>
                {book.available ? "Available" : "Borrowed"}
              </Badge>
            </div>
          </div>
        </Link>
        <BookActions book={book} />
      </Card>
    </article>
  )
}

export { BookCard }
export type { BookCardProps }
