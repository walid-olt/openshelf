"use client"

import { createContext, useCallback, useContext, useState } from "react"
import { DeleteDialog } from "@/components/delete-dialog"

interface PendingDelete {
  bookId: string
  bookTitle: string
  onConfirm: () => void
}

interface DeleteDialogContextValue {
  openDeleteDialog: (
    bookId: string,
    bookTitle: string,
    onConfirm: () => void,
  ) => void
}

const DeleteDialogContext = createContext<DeleteDialogContextValue | null>(null)

function DeleteDialogProvider({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState<PendingDelete | null>(null)

  const openDeleteDialog = useCallback(
    (bookId: string, bookTitle: string, onConfirm: () => void) => {
      setPending({ bookId, bookTitle, onConfirm })
    },
    [],
  )

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) setPending(null)
  }, [])

  const handleConfirm = useCallback(() => {
    pending?.onConfirm()
    setPending(null)
  }, [pending])

  return (
    <DeleteDialogContext.Provider value={{ openDeleteDialog }}>
      {children}
      <DeleteDialog
        bookTitle={pending?.bookTitle ?? ""}
        open={pending !== null}
        onOpenChange={handleOpenChange}
        onConfirm={handleConfirm}
      />
    </DeleteDialogContext.Provider>
  )
}

function useDeleteDialog() {
  const ctx = useContext(DeleteDialogContext)
  if (!ctx) throw new Error("useDeleteDialog must be used within DeleteDialogProvider")
  return ctx
}

export { DeleteDialogProvider, useDeleteDialog }
