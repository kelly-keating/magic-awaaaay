import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        ...configDefaults.coverage.exclude,
        '**/migrations',
        '**/seeds',
        '**/tests/_config.ts',
        '**/db/connection.ts',
        '**/knexfile.js',
      ],
    },
  },
})
