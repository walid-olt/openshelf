import { BooksApi } from "@/lib/api-client"
import { queryClient } from "@/lib/query-client"
import { useMutation } from "@tanstack/react-query"
import type { BookUpdateDto } from "@/types/book"

export default function useUpdateBookMutation() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: BookUpdateDto }) =>
      BooksApi.update(id, data),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ["books", res.data.id],
        })
        queryClient.invalidateQueries({
          queryKey: ["books"],
        })
      }
    },
  })
}
