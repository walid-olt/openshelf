import type { Book } from "@/types/book"

export const PLACEHOLDER_BOOKS: Book[] = [
  {
    id: "6650a1b2c3d4e5f6a7b8c9d0",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    category: "Classic",
    publicationYear: 1925,
    description:
      "A novel about the American dream set in the Jazz Age, following the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan.",
    available: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "6650a1b2c3d4e5f6a7b8c9d1",
    title: "Dune",
    author: "Frank Herbert",
    isbn: "9780441013593",
    category: "Science Fiction",
    publicationYear: 1965,
    description:
      "Set in the distant future amidst a feudal interstellar society, it tells the story of young Paul Atreides, whose family accepts the stewardship of the planet Arrakis.",
    available: false,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-03-05"),
  },
  {
    id: "6650a1b2c3d4e5f6a7b8c9d2",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "9780141439518",
    category: "Romance",
    publicationYear: 1813,
    description:
      "A romantic novel of manners that follows the character development of Elizabeth Bennet, who learns about the repercussions of hasty judgments.",
    available: true,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "6650a1b2c3d4e5f6a7b8c9d3",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "9780547928227",
    category: "Fantasy",
    publicationYear: 1937,
    description:
      "Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar.",
    available: true,
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "6650a1b2c3d4e5f6a7b8c9d4",
    title: "1984",
    author: "George Orwell",
    isbn: "9780451524935",
    category: "Dystopian",
    publicationYear: 1949,
    description:
      "A dystopian novel set in Airstrip One, a province of the superstate Oceania, in a world of perpetual war, omnipresent government surveillance, and public manipulation.",
    available: false,
    createdAt: new Date("2024-02-28"),
    updatedAt: new Date("2024-04-12"),
  },
  {
    id: "6650a1b2c3d4e5f6a7b8c9d5",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "9780061120084",
    category: "Literary Fiction",
    publicationYear: 1960,
    description:
      "Through the young eyes of Scout and Jem Finch, the novel explores racial injustice in the American South during the 1930s.",
    available: true,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
]
