# OpenShelf — Design Tasks

## Direction: "The Catalog Card"

A library catalog management app. The audience is library staff or students who need to browse, search, and manage a collection of books. The page's single job: let someone find a book or add one, fast.

Inspired by the physical card catalog: brass label holders, typed metadata, the grid of rectangular entries in wooden drawers. The aesthetic risk is treating each book entry like a catalog card — dense, typographically structured, with a prominent left-edge accent stripe that echoes the colored tab of a physical card.

---

## Palette

| Token | Role | Value | Notes |
|-------|------|-------|-------|
| `--primary` | Ink navy | `oklch(0.27 0.06 260)` | Library binding cloth, not generic black |
| `--primary-foreground` | White on ink | `oklch(0.97 0 0)` | |
| `--accent` | Oxidized brass | `oklch(0.72 0.1 75)` | Brass lamp fittings, gilt spine lettering |
| `--accent-foreground` | Dark on brass | `oklch(0.22 0.02 75)` | |
| `--background` | Parchment white | `oklch(0.985 0.004 80)` | Slightly warm, not clinical |
| `--card` | Card stock | `oklch(0.99 0.003 80)` | Subtly warmer than background |
| `--muted-foreground` | Aged ink | `oklch(0.5 0.01 260)` | Metadata, secondary text |

Dark mode keeps the same hue relationships, shifted darker.

## Typography

| Role | Font | Treatment |
|------|------|-----------|
| Display/headings | Merriweather (serif) | Book titles, page headings — literary character |
| Body/UI | DM Sans (sans) | Buttons, labels, nav, metadata — clean and legible |

Switch `html` base font from `font-serif` to `font-sans` so DM Sans is the body default. Reserve Merriweather for titles and headings only.

## Signature Element

Each BookCard has a **thick left-edge stripe** in the brass accent color, with the category rendered as a small uppercase eyebrow label above the title. On hover, the stripe subtly widens — like pulling a card from a drawer.

---

## Tasks

### Prerequisites / Setup

- [ ] **1. Create `components/theme-provider.tsx`**
  Wrap `next-themes`'s `ThemeProvider` so layout.tsx stops erroring.
  Pass `attribute="class"`, `defaultTheme="light"`, `enableSystem`.

- [ ] **2. Update `app/globals.css` color tokens**
  Replace the neutral/achromatic palette with the ink-navy + brass-amber system in both `:root` and `.dark` blocks. Switch `html` base font from `font-serif` to `font-sans`.

- [ ] **3. Install shadcn components**
  Run `pnpm dlx shadcn@latest add` for:
  `input`, `select`, `card`, `dialog`, `badge`, `textarea`, `label`, `separator`.

- [ ] **4. Create `components/ui/badge.tsx`**
  If shadcn badge isn't available in base-mira style, create a minimal one with `available` (green-ish) and `borrowed` (muted) variants.

### Components

- [ ] **5. `components/header.tsx`**
  - Fixed-height bar, full-width, subtle bottom border
  - Left: "OpenShelf" in Merriweather, links to `/`
  - Right: "Add book" button (shadcn Button, primary variant) linking to `/books/create`
  - Use `Link` from Next.js

- [ ] **6. `components/footer.tsx`**
  - Simple centered bar, muted text
  - "OpenShelf" + current year (`new Date().getFullYear()`)
  - Small top border separator

- [ ] **7. `components/search-bar.tsx`**
  - shadcn Input with Phosphor `MagnifyingGlass` icon on the left
  - Placeholder: "Search by title or author"
  - Controlled component: accepts `value` + `onChange` props

- [ ] **8. `components/filter.tsx`**
  - shadcn Select with options: All / Available / Borrowed
  - Controlled component: accepts `value` + `onValueChange` props
  - Compact width, sits beside search bar on desktop, below on mobile

- [ ] **9. `components/book-card.tsx`**
  - shadcn Card as base
  - Left-edge stripe: 4px solid accent color, expands to 6px on hover
  - Eyebrow: Category in uppercase, letter-spaced, muted-foreground, small text
  - Title: Merriweather, semibold, `text-lg`, link to `/books/[id]`
  - Author: DM Sans, muted foreground
  - Metadata row: Publication year + Badge ("Available" / "Borrowed")
  - Action row: "View" (ghost), "Edit" (ghost, links to `/books/edit/[id]`), "Delete" (ghost, destructive, opens delete dialog)
  - Accepts a `Book` type prop

- [ ] **10. `components/book-form.tsx`**
  - Shared component for create and edit
  - Props: `initialData?: Book`, `mode: "create" | "edit"`, `onSubmit` handler
  - Fields (Label + input each):
    - Title → Input
    - Author → Input
    - ISBN → Input
    - Category → Select populated from `BOOK_GENRES` constant
    - Publication year → Input type="number"
    - Description → Textarea
    - Available → toggle/checkbox
  - Submit: "Add book" (create) / "Save changes" (edit)
  - Cancel link back to home or book detail
  - Validation errors displayed inline below each field

- [ ] **11. `components/delete-dialog.tsx`**
  - shadcn Dialog
  - Props: `bookTitle: string`, `onConfirm: () => void`, `open` + `onOpenChange`
  - Title: "Delete book"
  - Body: "Are you sure you want to delete [title]? This cannot be undone."
  - Buttons: "Cancel" (outline) + "Delete" (destructive)

### Pages

- [ ] **12. `app/page.tsx` — Home / Catalog**
  - Server component, fetches all books via `BooksApi`
  - Hero section: "OpenShelf" heading (Merriweather) + one-line tagline
  - Controls row: SearchBar + Filter side by side
  - Book card grid: responsive CSS grid (3 cols desktop → 2 tablet → 1 mobile)
  - Client-side filtering: search by title/author (case-insensitive), filter by availability
  - Empty state: "No books yet. Add your first book." with link to create

- [ ] **13. `app/books/[id]/page.tsx` — Book Details**
  - Fetches single book by ID
  - Back link: "← Back to catalog"
  - Centered Card with generous padding:
    - Category eyebrow (uppercase, letter-spaced)
    - Title (Merriweather, `text-2xl` / `text-3xl`)
    - Author
    - Metadata grid: ISBN, Year, Status (with Badge)
    - Description paragraph
    - Separator
    - Action buttons: "Edit" + "Delete" (opens DeleteDialog)
  - 404 state: "Book not found" with link home

- [ ] **14. `app/books/create/page.tsx` — Add Book**
  - Heading: "Add a new book"
  - BookForm in create mode
  - On success: redirect to `/` via `router.push`
  - On validation error: show errors in form

- [ ] **15. `app/books/edit/[id]/page.tsx` — Edit Book**
  - Fetches existing book data
  - Heading: "Edit book"
  - BookForm in edit mode, pre-filled
  - On success: redirect to `/books/[id]`
  - 404 state if book not found

### Responsive

- [ ] **16. Mobile (375px+):** Single column cards, search/filter stacked, form fields full-width
- [ ] **17. Tablet (768px+):** 2-column card grid, search + filter inline
- [ ] **18. Desktop (1024px+):** 3-column card grid, max-width container

### Accessibility

- [ ] **19.** Visible focus rings on all interactive elements
- [ ] **20.** `prefers-reduced-motion` respected — disable hover transitions on card stripe
- [ ] **21.** Semantic HTML: `<nav>`, `<main>`, `<header>`, `<footer>`, `<article>` for cards
- [ ] **22.** Form fields associated with labels via `htmlFor`/`id`
