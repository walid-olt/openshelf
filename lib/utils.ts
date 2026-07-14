import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
import { ZodError } from "zod"

export function formatZodErrors(error: ZodError): Record<string, string> {
  return error.issues.reduce<Record<string, string>>((acc, issue) => {
    const fieldPath = issue.path.join(".") || "root"
    acc[fieldPath] = issue.message
    return acc
  }, {})
}
