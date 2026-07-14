export type ApiResponse<T> = {
  status: number
} & (
  | { success: true; data: T }
  | { success: false; error: string; details?: Record<string, string> }
)
