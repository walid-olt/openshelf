export type ApiResponse<T> = {
  status: number
} & (
  | { success: true; data: T }
  | { success: false; error: string; details?: Record<string, string> }
)

export type PaginatedData<T> = {
  books: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type BookQueryParams = {
  search?: string
  category?: string
  available?: boolean
  page?: number
  limit?: number
}
