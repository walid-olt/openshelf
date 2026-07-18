export type ApiResponse<T> = {
  status: number
} & (
  | { success: true; data: T }
  | { success: false; error: string; details?: Record<string, string> }
)

export type BookQueryParams = {
  search?: string
  category?: string
  available?: boolean
}
