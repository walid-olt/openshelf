import Link from "next/link"
import { BookOpenTextIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-12 items-center border-b border-border bg-background/80 px-4 backdrop-blur-sm">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BookOpenTextIcon className="size-8 text-accent" weight="fill" />
          <span className="font-serif text-xl font-bold tracking-tight text-foreground">
            OpenShelf
          </span>
        </Link>
        <Button
          render={<Link href="/books/create">Add book</Link>}
          nativeButton={false}
          size="lg"
        />
      </nav>
    </header>
  )
}

export default Header
