import matches from '../src/matches'
import test from 'tape'

test('Matches normal cvn code with a valid card', t => {
  t.true(matches('333', '4111111111111111').isValid)
  t.end()
})

test('Matches amex cvn with an amex card', t => {
  t.true(matches('4444', '341258393919545').isValid)
  t.end()
})

test('Returns false when the match is invalid', t => {
  t.false(matches('333', '341258393919545').isValid)
  t.end()
})

test('Works with number types', t => {
  t.true(matches(333, 4111111111111111).isValid)
  t.end()
})

test('Throws type error when both arguments are not the correct type', t => {
  try {
    matches([], {})
  } catch (err) {
    t.is(err.message, 'cvn and card number should be string or number types')
    t.end()
  }
})

test('Throws type error when one of the arguments is not the correct type', t => {
  try {
    matches(333, {})
  } catch (err) {
    t.is(err.message, 'cvn and card number should be string or number types')
    t.end()
  }
})
