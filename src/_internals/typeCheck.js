import or from 'kyanite/or'
import type from 'kyanite/type'

// Type check for our passed in Data
export default x => or(type(x) === 'String', type(x) === 'Number')
