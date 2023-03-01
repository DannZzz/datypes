import { _clone } from "../utils"

export type $object<T> = T & $Object<T>

export class $Object<T> {
  /**
   * Similiar with JSON.stringify()
   */
  readonly $stringify: () => string
  /**
   * Wheter or not object and this have the same properties
   */
  readonly $same: (object: any) => boolean
  /**
   * Object's size/length
   */
  readonly $size: () => number
  /**
   * Wheter or not the object is empty
   */
  readonly $empty: () => boolean
  /**
   * Deeply clones object without references
   * primitive types, arrays, objects and Date
   * Functions with refs !
   */
  readonly $clone: () => $object<T>
  /**
   * Clones with refs, faster
   */
  readonly $shallowClone: () => $object<T>
  /**
   * Map method
   *
   * @example
   * $({price1: 10, price2: 20}).map((val, key) => val * 2) // {price1: 20, price2: 40}
   */
  readonly $map: (cb: (value: any, key: keyof T) => any) => $object<T>
  /**
   * Filter method
   *
   * @example
   * $({price1: 10, price2: 20}).filter((val, key) => val > 15) // {price2: 20}
   */
  readonly $filter: (cb: (value: any, key: keyof T) => boolean) => $object<any>
  /**
   * For Each method / Loop
   *
   * @example
   * $({price1: 10, price2: 20}).forEach((val, key) => console.log(key, value))
   */
  readonly $forEach: (cb: (value: any, key: keyof T) => any) => void
  /**
   * Every Method
   *
   * @returns {boolean}
   *
   * @example
   * $({price1: 10, price2: 20}).every((val, key) => val > 15) // false
   */
  readonly $every: (cb: (value: any, key: keyof T) => any) => boolean
  /**
   * Some Method
   *
   * @returns {boolean}
   *
   * @example
   * $({price1: 10, price2: 20}).some((val, key) => val > 15) // true
   */
  readonly $some: (cb: (value: any, key: keyof T) => any) => boolean
  /**
   * Wheter or not object has a property with this key
   *
   * @returns {boolean}
   *
   * @example
   * $({price1: 10, price2: 20}).has("price1") // true
   */
  readonly $has: (key: any) => boolean
  /**
   * Wheter or not object has some properties with these keys
   *
   * @returns {boolean}
   *
   * @example
   * $({price1: 10, price2: 20}).hasSome("price1", "price3") // true
   */
  readonly $hasSome: (...keys: any[]) => boolean
  /**
   * Wheter or not object has all properties with these keys
   *
   * @returns {boolean}
   *
   * @example
   * $({price1: 10, price2: 20}).hasAll("price1", "price3") // false
   */
  readonly $hasAll: (...keys: any[]) => boolean
  /**
   * Logs this object
   */
  readonly $log: () => void

  private constructor(value?: any) {
    Object.defineProperties(this, {
      $log: {
        enumerable: false,
        writable: false,
        value: () => {
          console.log(this)
        },
      },
      $hasAll: {
        enumerable: false,
        writable: false,
        value: (...keys: any[]) => {
          return keys.every(
            (key) => key in this && this.propertyIsEnumerable(key)
          )
        },
      },
      $hasSome: {
        enumerable: false,
        writable: false,
        value: (...keys: any[]) => {
          return keys.some(
            (key) => key in this && this.propertyIsEnumerable(key)
          )
        },
      },
      $has: {
        enumerable: false,
        writable: false,
        value: (key: any) => {
          return key in this && this.propertyIsEnumerable(key)
        },
      },
      $some: {
        enumerable: false,
        writable: false,
        value: (cb: (value: any, key: any) => any) => {
          for (let k in this) {
            if (cb(this[k], k)) return true
          }
          return false
        },
      },
      $every: {
        enumerable: false,
        writable: false,
        value: (cb: (value: any, key: any) => any) => {
          for (let k in this) {
            if (!cb(this[k], k)) return false
          }

          return true
        },
      },
      $stringify: {
        enumerable: false,
        writable: false,
        value: () => {
          return JSON.stringify(this)
        },
      },
      $size: {
        enumerable: false,
        writable: false,
        value: () => {
          return Object.keys(this).length
        },
      },
      $empty: {
        enumerable: false,
        writable: false,
        value: () => {
          return Object.keys(this).length === 0
        },
      },
      $same: {
        enumerable: false,
        writable: false,
        value: (object: any) => {
          if (!object) return false
          if (!(object instanceof Object)) return false
          if (this.$size() !== Object.keys(object).length) return false
          for (let k in object) {
            if (object[k] !== this[k]) return false
          }
          return true
        },
      },
      $clone: {
        enumerable: false,
        writable: false,
        value: () => {
          return $Object.new(_clone(this))
        },
      },
      $shallowClone: {
        enumerable: false,
        writable: false,
        value: () => {
          return $Object.new(Object.assign({}, this))
        },
      },
      $map: {
        enumerable: false,
        writable: false,
        value: (cb: (value: any, key: any) => any) => {
          const obj = {} as any
          for (let k in this) {
            obj[k] = cb(this[k], k)
          }
          return $Object.new(obj)
        },
      },
      $filter: {
        enumerable: false,
        writable: false,
        value: (cb: (value: any, key: any) => any) => {
          const obj = {} as any
          for (let k in this) {
            if (!!cb(this[k], k)) obj[k] = this[k]
          }
          return $Object.new(obj)
        },
      },
      $forEach: {
        enumerable: false,
        writable: false,
        value: (cb: (value: any, key: any) => any) => {
          const obj = {} as any
          for (let k in this) {
            cb(this[k], k)
          }
        },
      },
    })

    if (value instanceof Object) {
      for (let k in value) {
        if (!Object.hasOwn(this, k)) {
          this[k] = value[k]
        }
      }
    }
  }

  static is$object(val: any): val is $Object<any> {
    return val instanceof $Object
  }

  static new<D extends any>(value: D): $object<D> {
    return $Object.new(value) as any
  }
}

export default $Object
