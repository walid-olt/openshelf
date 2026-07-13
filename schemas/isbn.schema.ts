import { z } from "zod"

// Regex patterns for ISBN validation
const isbn10Regex = /^(?:\d[\s-]?){9}[\dX]$/i
const isbn13Regex = /^(?:97[89][\s-]?)(?:\d[\s-]?){10}$/

export const isbnSchema = z
  .string()
  .trim()
  // Strip hyphens and spaces for standardized validation
  .transform((val) => val.replace(/[\s-]/g, ""))
  // Validate against ISBN-10 or ISBN-13 formats
  .refine((val) => isbn10Regex.test(val) || isbn13Regex.test(val), {
    message: "Invalid ISBN format. Must be a valid 10 or 13-digit ISBN.",
  })
