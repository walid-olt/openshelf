import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative flex-1">
      <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search by title or author"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 pl-8 text-base"
      />
    </div>
  )
}

export { SearchBar }
export type { SearchBarProps }
