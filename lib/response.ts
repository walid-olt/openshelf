import { NextResponse } from "next/server"
import type { ApiResponse } from "@/types/response"

export function createResponse<T>(res: ApiResponse<T>) {
  const { success } = res
  if (!success) {
    return new NextResponse(JSON.stringify(res), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    })
  }
  return new NextResponse(JSON.stringify(res), {
    status: res.status || 200,
    headers: { "Content-Type": "application/json" },
  })
}
