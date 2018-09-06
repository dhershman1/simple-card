import typeCheck from '../src/_internals/typeCheck'
import test from 'tape'

test('Properly checks for types', t => {
  t.true(typeCheck('test'))
  t.true(typeCheck(1))
  t.false(typeCheck({}))
  t.false(typeCheck([]))
  t.end()
})
