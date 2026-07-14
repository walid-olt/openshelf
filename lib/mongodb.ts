import mongoose from "mongoose"

// Global is used here to maintain a cached connection across hot reloads in development.
interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  if (cached!.conn) {
    return cached!.conn
  }

  const MONGODB_URI = process.env.MONGODB_URI

  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable in .env.local"
    )
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached!.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        return mongooseInstance
      })
  }

  try {
    cached!.conn = await cached!.promise
  } catch (e) {
    cached!.promise = null
    throw e
  }

  return cached!.conn
}

// catch mongo duplicate key error
interface MongoDuplicateError extends Error {
  code: number
  codeName?: string
  keyPattern: Record<string, number>

  // eslint-disable-next-line
  keyValue: Record<string, any>
  index: number
}
export function isMongoDuplicateError(
  error: unknown
): error is MongoDuplicateError {
  return (
    typeof error === "object" &&
    error !== null &&
    // eslint-disable-next-line
    (("code" in error && (error as any).code === 11000) ||
      // eslint-disable-next-line
      ("codeName" in error && (error as any).codeName === "DuplicateKey"))
  )
}
export default dbConnect
