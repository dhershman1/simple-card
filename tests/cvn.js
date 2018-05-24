import cvn from '../src/cvn'
import test from 'tape'

test('Test CVN Normal', t => {
  const { isValid, cvnType } = cvn('334')

  t.true(isValid, 'Is a valid cvn')
  t.is(cvnType, 'norm', 'Returned as a normal cvn')
  t.end()
})

test('Test CVN Amex', t => {
  const { isValid, cvnType } = cvn('3534')

  t.true(isValid, 'Is a valid cvn')
  t.is(cvnType, 'amex', 'Returned as an amex cvn')
  t.end()
})

test('Works with number types', t => {
  const { isValid, cvnType } = cvn(333)

  t.true(isValid)
  t.is(cvnType, 'norm')
  t.end()
})

test('Amex works with number types', t => {
  const { isValid, cvnType } = cvn(3333)

  t.true(isValid)
  t.is(cvnType, 'amex')
  t.end()
})

test('Returns invalid with bad CVN code', t => {
  const { isValid, cvnType } = cvn('22')

  t.false(isValid)
  t.is(cvnType, 'Invalid CVN Code')
  t.end()
})

test('Throws type error when not given correct type', t => {
  try {
    cvn([])
  } catch (err) {
    t.is(err.message, 'cvn should be a string or number type')
    t.end()
  }
})
