//eslint-disable-next-line no-unused-vars
export const queryMapper = (req, res, next) => {
  if (req.query.filter) {
    Object.keys(req.query.filter).forEach((key) => {
      if (isRegex(req.query.filter[key])) {
        req.query.filter[key] = new RegExp(req.query.filter[key].slice(1, -1))
      }
      if (req.query.filter[key] === 'true' || req.query.filter[key] === 'false') {
        req.query.filter[key] = req.query.filter[key] === 'true'
      }
    })
  }
  next()
}

const isRegex = (s) => {
  try {
    const m = s.match(/^([/~@;%#'])(.*?)\1([gimsuy]*)$/)
    return m ? !!new RegExp(m[2], m[3]) : false
  } catch (e) {
    return false
  }
}
