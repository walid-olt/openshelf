"use client"

import Link from "next/link"
import {
  PencilSimpleIcon,
  TrashIcon,
  ArrowSquareOutIcon,
} from "@phosphor-icons/react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useDeleteDialog } from "@/components/delete-dialog-context"
import type { Book } from "@/types/book"

interface BookCardProps {
  book: Book
  onDelete?: (id: string) => void
}

function BookCard({ book, onDelete }: BookCardProps) {
  const { openDeleteDialog } = useDeleteDialog()

  return (
    <article className="group/card relative">
      <Link href={`/books/${book.id}`}>
        <Card className="relative overflow-visible border-l-4 border-l-accent pl-5 transition-all duration-200 ease-out">
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
        </Card>
      </Link>
    </article>
  )
}

export { BookCard }
export type { BookCardProps }
