import getCardType from '../src/_internals/getCardType'
import test from 'tape'

test('Grabs proper card type', t => {
  t.is(getCardType('341258393919545'), 'amex')
  t.is(getCardType('5387109830289055'), 'master')
  t.is(getCardType('6011906326377506'), 'discover')
  t.is(getCardType('4122027811098688'), 'visa')
  t.end()
})
