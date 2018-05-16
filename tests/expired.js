import expired from '../src/expired'
import test from 'ava'

const today = new Date()

test('Test Date validation', t => {
  const { isValid, isExpired } = expired(`${today.getMonth() + 1}/${today.getFullYear()}`)

  t.true(isValid, 'Is a valid date')
  t.false(isExpired, 'Not Expired')
})

test('Returns as invalid when given expired date', t => {
  const { isValid, isExpired } = expired('01/17')

  t.false(isValid)
  t.true(isExpired, 'Is Expired')
})

test('Throws type error when not given correct type', t => {
  const err = t.throws(() => {
    expired([])
  }, TypeError)

  t.is(err.message, 'date should be a string type')
})

test('Throws type error when given date object', t => {
  const err = t.throws(() => {
    expired(today)
  }, TypeError)

  t.is(err.message, 'date should be a string type')
})

test('Handles invalid date string', t => {
  const results = expired('21/21')

  t.true(results.isExpired)
  t.false(results.isValid)
})
