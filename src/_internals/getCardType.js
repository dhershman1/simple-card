import find from 'kyanite/find'
import range from 'kyanite/range'
import some from 'kyanite/some'

// Our function that goes through our number and tries to find the type it belongs to
export default ccNumber => {
  const types = {
    amex: [34, 37],
    // 6011, 622126-622925, 644-649, 65
    discover: [6011, ...range(622126, 622926), ...range(644, 650), 65],
    // 50 - 55
    master: range(50, 56),
    visa: [4]
  }

  return find(k => some(n => new RegExp(`^${n}`).test(ccNumber), types[k]), Object.keys(types))
}
