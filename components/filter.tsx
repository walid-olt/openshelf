"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FilterProps {
  value: string
  onValueChange: (value: string) => void
}

function Filter({ value, onValueChange }: FilterProps) {
  return (
    <div className="h-full">
      <Select value={value} onValueChange={(v) => v && onValueChange(v)}>
        <SelectTrigger className="w-32.5">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="available">Available</SelectItem>
          <SelectItem value="borrowed">Borrowed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export { Filter }
export type { FilterProps }
