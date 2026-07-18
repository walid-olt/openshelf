"use client"

import { useForm } from "react-hook-form"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
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
import { bookCreateSchema } from "@/schemas/book.schema"
import { BooksApi } from "@/lib/api-client"
import type { BookCreateDto } from "@/types/book"

function CreateBookForm() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: BooksApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] })
      router.push("/")
    },
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: standardSchemaResolver(bookCreateSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      category: BOOK_GENRES[0] as BookCreateDto["category"],
      publicationYear: new Date().getFullYear(),
      description: "",
      available: true,
    },
  })

  const category = watch("category")
  const available = watch("available")

  const onSubmit = async (data: BookCreateDto) => {
    await mutateAsync(data)
  }

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
        <Label htmlFor="isbn">ISBN</Label>
        <Input
          id="isbn"
          placeholder="978-3-16-148410-0"
          {...register("isbn")}
        />
        {errors.isbn && (
          <p className="text-xs text-destructive">{errors.isbn.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>Category</Label>
        <Select
          value={category}
          onValueChange={(v) =>
            setValue("category", v as BookCreateDto["category"])
          }
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
        <input
          type="checkbox"
          id="available"
          checked={available}
          onChange={(e) => setValue("available", e.target.checked)}
          className="size-5 rounded border-input accent-accent"
        />
        <Label htmlFor="available" className="font-normal">
          Available for borrow
        </Label>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error.message}</p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={isPending}>
          Add book
        </Button>
        <Button
          variant="ghost"
          nativeButton={false}
          render={
            <Link href="/">
              <ArrowLeftIcon />
              Cancel
            </Link>
          }
        />
      </div>
    </form>
  )
}

export { CreateBookForm }
