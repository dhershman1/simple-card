// Create a range from a to b based on the values provided
const range = (from, to) => {
  const result = []
  let i = from

  for (i; i < to; i++) {
    result.push(i)
  }

  return result
}

// Our function that goes through our number and tries to find the type it belongs to
export default ccNumber => {
  const types = {
    amex: [34, 37],
    discover: [6011, ...range(622126, 622925), ...range(644, 649), 65],
    master: range(50, 55),
    visa: [4]
  }

  for (const cardType in types) {
    const [found] = types[cardType].filter(n => new RegExp(`^${n}`).test(ccNumber))

    if (found) {
      return cardType
    }
  }

  return false
}
