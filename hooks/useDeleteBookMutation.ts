import { BooksApi } from "@/lib/api-client"
import { queryClient } from "@/lib/query-client"
import { useMutation } from "@tanstack/react-query"

export default function useDeleteBookMutation() {
  return useMutation({
    mutationFn: BooksApi.delete,
    onSuccess: (res) => {
      if (res.success) {
        const deletedBook = res.data
        queryClient.invalidateQueries({
          queryKey: ["books", deletedBook.id],
        })
        queryClient.invalidateQueries({
          queryKey: ["books"],
        })
      }
    },
  })
}
