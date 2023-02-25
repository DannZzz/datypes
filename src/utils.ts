export function _clone(obj: any) {
  var copy: any

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = []
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = _clone(obj[i])
    }
    return copy
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {}
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = _clone(obj[attr])
    }
    return copy
  }

  return obj
  // throw new Error("Unable to copy obj! Its type isn't supported.")
}
