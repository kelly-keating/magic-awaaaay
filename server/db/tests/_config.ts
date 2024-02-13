import { beforeAll, beforeEach } from 'vitest'
import testDb from '../connection'

beforeAll(async () => {
  await testDb.migrate.latest()
})

beforeEach(async () => {
  await testDb.seed.run()
})
