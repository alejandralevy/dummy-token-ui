export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: { '^.+\\.tsx?$': ['ts-jest', {}] },
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
}
