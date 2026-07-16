"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { ArrowLeftIcon } from "@phosphor-icons/react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BOOK_GENRES } from "@/lib/constants/BOOK_GENRES"
import type { Book } from "@/types/book"

const bookFormSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .max(100, "Title must be less than 100 characters"),
  author: z
    .string()
    .nonempty("Author is required")
    .max(50, "Author must be less than 50 characters"),
  isbn: z
    .string()
    .trim()
    .transform((val) => val.replace(/[\s-]/g, ""))
    .refine(
      (val) =>
        /^(?:\d[\s-]?){9}[\dX]$/i.test(val) ||
        /^(?:97[89][\s-]?)(?:\d[\s-]?){10}$/.test(val),
      {
        message: "Invalid ISBN format. Must be a valid 10 or 13-digit ISBN.",
      }
    ),
  category: z.enum(BOOK_GENRES),
  publicationYear: z
    .number()
    .int()
    .min(1000, "Publication year must be a valid year")
    .max(new Date().getFullYear(), "Publication year cannot be in the future"),
  description: z
    .string()
    .nonempty("Description is required")
    .min(16, "Description must be at least 16 characters")
    .max(500, "Description must be less than 500 characters"),
  available: z.boolean(),
})

type BookFormValues = z.infer<typeof bookFormSchema>

interface BookFormProps {
  initialData?: Book
  mode: "create" | "edit"
  onSubmit: (data: BookFormValues) => void | Promise<void>
}

function BookForm({ initialData, mode, onSubmit }: BookFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BookFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(bookFormSchema as any),
    defaultValues: initialData
      ? {
          title: initialData.title,
          author: initialData.author,
          isbn: initialData.isbn,
          category: initialData.category,
          publicationYear: initialData.publicationYear,
          description: initialData.description,
          available: initialData.available,
        }
      : {
          title: "",
          author: "",
          isbn: "",
          category: undefined,
          publicationYear: new Date().getFullYear(),
          description: "",
          available: true,
        },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} />
        {errors.title && (
          <p className="text-xs text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="author">Author</Label>
        <Input id="author" {...register("author")} />
        {errors.author && (
          <p className="text-xs text-destructive">{errors.author.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="isbn">
          ISBN <span className="text-sm text-muted">{"(can't be edited)"}</span>
        </Label>
        <Input
          className="cursor-not-allowed grayscale-50"
          disabled
          id="isbn"
          placeholder="978-3-16-148410-0"
        />
      </div>

      <div className="space-y-1.5">
        <Label>Category</Label>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(v) => v && field.onChange(v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent>
                {BOOK_GENRES.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && (
          <p className="text-xs text-destructive">{errors.category.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="publicationYear">Publication year</Label>
        <Input
          id="publicationYear"
          type="number"
          {...register("publicationYear", { valueAsNumber: true })}
        />
        {errors.publicationYear && (
          <p className="text-xs text-destructive">
            {errors.publicationYear.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" rows={4} {...register("description")} />
        {errors.description && (
          <p className="text-xs text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Controller
          control={control}
          name="available"
          render={({ field }) => (
            <input
              type="checkbox"
              id="available"
              checked={field.value}
              onChange={field.onChange}
              className="size-5 rounded border-input accent-accent"
            />
          )}
        />
        <Label htmlFor="available" className="font-normal">
          Available for borrow
        </Label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {mode === "create" ? "Add book" : "Save changes"}
        </Button>
        <Button
          variant="ghost"
          nativeButton={false}
          render={
            <Link
              href={
                mode === "edit" && initialData
                  ? `/books/${initialData.id}`
                  : "/"
              }
            >
              <ArrowLeftIcon />
              Cancel
            </Link>
          }
        />
      </div>
    </form>
  )
}

export { BookForm }
export type { BookFormProps, BookFormValues }
