import cvn from '../src/cvn'
import test from 'ava'

test('Test CVN Normal', t => {
  const { isValid, cvnType } = cvn('334')

  t.true(isValid, 'Is a valid cvn')
  t.is(cvnType, 'norm', 'Returned as a normal cvn')
})

test('Test CVN Amex', t => {
  const { isValid, cvnType } = cvn('3534')

  t.true(isValid, 'Is a valid cvn')
  t.is(cvnType, 'amex', 'Returned as an amex cvn')
})

test('Works with number types', t => {
  const { isValid, cvnType } = cvn(333)

  t.true(isValid)
  t.is(cvnType, 'norm')
})

test('Amex works with number types', t => {
  const { isValid, cvnType } = cvn(3333)

  t.true(isValid)
  t.is(cvnType, 'amex')
})

test('Returns invalid with bad CVN code', t => {
  const { isValid, cvnType } = cvn('22')

  t.false(isValid)
  t.is(cvnType, 'Invalid CVN Code')
})

test('Throws type error when not given correct type', t => {
  const err = t.throws(() => {
    cvn([])
  }, TypeError)

  t.is(err.message, 'cvn should be a string or number type')
})
