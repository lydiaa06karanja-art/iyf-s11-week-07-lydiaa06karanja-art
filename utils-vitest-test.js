import { describe, it, expect } from 'vitest'
import { formatTask, isTaskValid } from './utils-vitest.js'

test('formatTask trims whitespace', () => {
  expect(formatTask('  buy milk  ')).toBe('buy milk')
})

test('formatTask returns empty for spaces - edge case', () => {
  expect(formatTask('   ')).toBe('')
})

test('isTaskValid returns true for real task', () => {
  expect(isTaskValid('do homework')).toBe(true)
})

test('isTaskValid returns false for empty - edge case', () => {
  expect(isTaskValid('')).toBe(false)
})
