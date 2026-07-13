# OpenShelf - Library Book Management Application

A Full Stack library book management application built with Next.js, MongoDB, and TypeScript.

## Overview

This application manages a library catalog with hundreds of books. The focus is on learning Next.js Full Stack features:

- Route Handlers (API routes)
- CRUD operations
- Frontend ↔ Backend communication
- MongoDB with Mongoose
- Data validation with Zod
- Dynamic routes
- Page navigation

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js | Full Stack framework |
| TypeScript | Type safety (no `any` allowed) |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| Zod | Data validation |

---

## Core Features

### 1. Home Page - Book Catalog
**Route:** `/`

Displays the library catalog with:
- Library name and description
- Complete list of books

Each book card shows:
- Title
- Author
- Category
- Publication year
- Status (Available / Borrowed)
- Action buttons: View Details, Edit, Delete

Data must be fetched from database via Route Handler.

### 2. Add Book
**Route:** `/books/create`

Form to add a new book with fields:
- Title
- Author
- ISBN
- Category
- Publication year
- Description

**Validation:** All fields validated before save.
**After creation:** Redirect to home page.

### 3. Book Details
**Route:** `/books/[id]`

Dynamic route displaying all book information:
- Title
- Author
- ISBN
- Category
- Publication year
- Description
- Status

### 4. Edit Book
**Route:** `/books/edit/[id]`

Pre-filled form with existing book data.
**After update:** Redirect to book detail page.

### 5. Delete Book
From the book list, users can delete a book.

**Requirement:** Confirmation dialog before deletion.
**After deletion:** List auto-updates.

### 6. Search
Search bar to find books by:
- Title
- Author

**Implementation:** Client-side filtering.

### 7. Filter
Filter books by status:
- All
- Available
- Borrowed

### 8. Responsive Design

| Breakpoint | Min Width |
|------------|-----------|
| Mobile | ≥ 375px |
| Tablet | ≥ 768px |
| Desktop | ≥ 1024px |

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/books` | List all books |
| `GET` | `/api/books/:id` | Get book by ID |
| `POST` | `/api/books` | Create new book |
| `PUT` | `/api/books/:id` | Update book |
| `DELETE` | `/api/books/:id` | Delete book |

**Requirements:**
- Return appropriate HTTP status codes
- Use Route Handlers only (no direct MongoDB access from components)

---

## Data Validation (Zod)

| Field | Rules |
|-------|-------|
| `title` | Required, min 3 characters |
| `author` | Required |
| `isbn` | Required, unique |
| `category` | Required |
| `publicationYear` | Valid number |
| `description` | Min 10 characters |

**Error handling:** Display validation errors to user.

---

## Database Schema (Mongoose)

**Model:** `Book`

```typescript
{
  title: string;
  author: string;
  isbn: string;
  category: string;
  publicationYear: number;
  description: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home page
│   ├── layout.tsx                  # Global layout
│   ├── books/
│   │   ├── create/
│   │   │   └── page.tsx            # Add book form
│   │   ├── edit/
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Edit book form
│   │   └── [id]/
│   │       └── page.tsx            # Book details
│   └── api/
│       └── books/
│           ├── route.ts            # GET all, POST
│           └── [id]/
│               └── route.ts        # GET one, PUT, DELETE
├── components/
│   ├── BookCard.tsx
│   ├── BookForm.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── SearchBar.tsx
│   └── Filter.tsx
├── models/
│   └── Book.ts
├── lib/
│   ├── db.ts                       # MongoDB connection
│   └── validators.ts               # Zod schemas
├── types/
│   └── Book.ts                     # TypeScript interfaces
└── services/
    └── book.service.ts             # Business logic
```

---

## Technical Requirements

### Global Layout
- **Header:** Library name, Home link, Add Book link
- **Footer:** Application name, Current year
- Visible on all pages

### Navigation
- Use Next.js `Link` component exclusively
- Handle redirects after CRUD operations

### Error Handling
Display user-friendly messages for:
- Book not found
- Validation errors
- Server errors

---

## Bonus Features

| Feature | Description |
|---------|-------------|
| Sort by title | Alphabetical sorting |
| Sort by year | Newest to oldest |
| Pagination | 10 books per page |

---

## Constraints

- [ ] TypeScript only (no `.js` files)
- [ ] No `any` types
- [ ] MongoDB + Mongoose
- [ ] Zod validation
- [ ] Next.js Route Handlers
- [ ] Modular architecture
- [ ] Reusable components

---

## Timeline

| Milestone | Date |
|-----------|------|
| Brief launch | 13/07/2026 |
| Submission deadline | 17/07/2026 before 18:00 |
| Final GitHub push | Sunday before 23:59 |

**Note:** Late submissions will not be accepted.

---

## Assessment Criteria

- [ ] Route Handlers implementation (GET, POST, PUT, DELETE)
- [ ] Frontend ↔ Backend communication
- [ ] MongoDB manipulation with Mongoose
- [ ] Data validation with Zod
- [ ] Dynamic routes handling
- [ ] Page navigation
- [ ] Project organization
- [ ] Component reuse
- [ ] TypeScript code quality
- [ ] Error handling
