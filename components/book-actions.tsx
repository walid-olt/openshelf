"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { useDeleteDialog } from "@/components/delete-dialog-context"
import useDeleteBookMutation from "@/hooks/useDeleteBookMutation"
import type { Book } from "@/types/book"

interface BookActionsProps {
  book: Book
}

function BookActions({ book }: BookActionsProps) {
  const router = useRouter()
  const { openDeleteDialog } = useDeleteDialog()
  const { mutateAsync: deleteBook } = useDeleteBookMutation()

  const handleDelete = () => {
    openDeleteDialog(book.id, book.title, async () => {
      await deleteBook(book.id)
      router.push("/")
    })
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        nativeButton={false}
        render={<Link href={`/books/edit/${book.id}`}>Edit</Link>}
        data-icon="inline-start"
      >
        <PencilSimpleIcon />
        Edit
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDelete}
      >
        <TrashIcon />
        Delete
      </Button>
    </div>
  )
}

export { BookActions }
export type { BookActionsProps }
