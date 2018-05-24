import expired from '../src/expired'
import test from 'tape'

const today = new Date()

test('Test Date validation', t => {
  const { isValid, isExpired } = expired(`${today.getMonth() + 1}/${today.getFullYear()}`)

  t.true(isValid, 'Is a valid date')
  t.false(isExpired, 'Not Expired')
  t.end()
})

test('Returns as invalid when given expired date', t => {
  const { isValid, isExpired } = expired('01/17')

  t.false(isValid)
  t.true(isExpired, 'Is Expired')
  t.end()
})

test('Throws type error when not given correct type', t => {
  try {
    expired([])
  } catch (err) {
    t.is(err.message, 'date should be a string type')
    t.end()
  }
})

test('Throws type error when given date object', t => {
  try {
    expired(today)
  } catch (err) {
    t.is(err.message, 'date should be a string type')
    t.end()
  }
})

test('Handles invalid date string', t => {
  const results = expired('21/21')

  t.true(results.isExpired)
  t.false(results.isValid)
  t.end()
})
