import { beforeAll, afterAll, beforeEach } from "vitest"
import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

let mongoServer: MongoMemoryServer

// 1. Spin up the in-memory database before all tests run
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()

  // Connect Mongoose to the memory server
  await mongoose.connect(mongoUri)
})

// 2. Clear database collections between tests to prevent data pollution
beforeEach(async () => {
  if (mongoose.connection.readyState !== 0) {
    const collections = mongoose.connection.collections
    for (const key in collections) {
      await collections[key].deleteMany({})
    }
  }
})

// 3. Stop the memory server and close the Mongoose connection when tests finish
afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})
