import { AnyObject } from "./type"
import { $NumberConstructor } from "./classes/$number"
import { $ArrayConstructor } from "./classes/$Array"
import { $StringConstructor } from "./classes/$string"
import { $Object } from "./classes/$object"
import { randomNumber } from "anytool"

declare global {
  /**
   * Object type {}
   * @example
   * $object<{name: string; age: number}>
   */
  type $object<T = any> = T & $Object<T>
  /**
   * Array type []
   * @example
   * $Array<number> === number[]
   */
  type $Array<T> = Array<T> & $ArrayConstructor<T>
  /**
   * Number type
   * default it's just a number
   * @example
   * $number === any number
   * $number<1 | 2> === only 1 or 2
   */
  type $number<T extends number = number> = T & $NumberConstructor<T>
  /**
   * String type
   * default it's just a string
   * @example
   * $string === any string
   * $string<"name" | "surname"> === only "name" or "surname"
   */
  type $string<T extends string = string> = T & $StringConstructor<T>

  namespace $ {
    /**
     * Get random integer from range
     *
     * @param {number} min min of range
     * @param {number} max max of range
     * @returns {$number}
     */
    export const randomNumber: (min: number, max: number) => $number

    /**
     * Creates $Array with spec. length with custom mapping
     *
     * @param length length of array
     * @param {(i: number) => any} map
     * @returns {$Array}
     *
     * @example
     * const numbers = $.$ArrayLength(5, (i) => i) // [0, 1, 2, 3, 4]
     * const randomDigits = $.$ArrayLength(4, () => $.randomNumber(0, 9)) // [4, 6, 7, 1]
     */
    export const $ArrayLength: <T>(
      length: number,
      map: (index: number) => T
    ) => $Array<T>

    /**
     * Whether or not value is an instance of $number
     *
     * @param {any} val
     * @returns {boolean}
     */
    export const is$number: (val: any) => val is $number

    /**
     * Whether or not value is an instance of $string
     *
     * @param {any} val
     * @returns {boolean}
     */
    export const is$string: (val: any) => val is $string

    /**
     * Whether or not value is an instance of $Array
     *
     * @param {any} val
     * @returns {boolean}
     */
    export const is$Array: (val: any) => val is $Array<any>

    /**
     * Whether or not value is an instance of $object
     *
     * @param {any} val
     * @returns {boolean}
     */
    export const is$object: (val: any) => val is $object
  }

  /**
   * Define a value
   *
   * @example
   * const a = $() // undefined
   */
  function $(): any
  /**
   * Define a value
   *
   * @param {TemplateStringsArray} value Template Strings Array ``
   *
   * @example
   * const names = $`Dann
   * Meri`
   * // string[] (["Dann", "Meri"])
   */
  function $(value: TemplateStringsArray): GetType<string[]>
  /**
   * Define a value
   *
   * @param {any} value
   *
   * @example
   * const name = $("Dann") // $string
   * const age = $(18) // $number
   * const hobbies = $(["havn't", "any"]) // $Array<string>
   * const phrases = $({
   * hello: "just hello buddy",
   * bye: "see you soon cutie"
   * }) // $object<{hello: string; bye: string}>
   */
  function $<T>(value: T): GetType<T>
}

type ParseArrayType<T> = T extends (infer R)[] ? R : T
type GetType<T = any> = T extends number
  ? $number<T>
  : T extends string
  ? $string<T>
  : T extends any[]
  ? $Array<ParseArrayType<T>>
  : T extends AnyObject
  ? $object<T>
  : T

function $<T>(value?: T): any {
  if (value == null || value == undefined) return undefined

  if (typeof value === "number") return $NumberConstructor.new(value)
  if (typeof value === "string") return $StringConstructor.new(value)

  if (Array.isArray(value)) return $ArrayConstructor.new(...value)

  if (value instanceof Object) return $Object.new(value)

  return value
}
/**
 * Get random integer from range
 *
 * @param {number} min min of range
 * @param {number} max max of range
 * @returns {$number}
 */
$.randomNumber = (min: number, max: number): $number => {
  return $NumberConstructor.new(randomNumber(min, max))
}

$.$ArrayLength = <T>(length: number, map: (index: number) => T): $Array<T> => {
  const arr = $([])
  for (let i = 0; i < length; i++) {
    arr.push(map(i))
  }
  return arr
}

$.is$number = (val: any): val is $number => {
  return val instanceof $NumberConstructor
}

$.is$string = (val: any): val is $string => {
  return val instanceof $StringConstructor
}

$.is$object = (val: any): val is $Object<any> => {
  return val instanceof $Object
}

$.is$Array = (val: any): val is $Array<any> => {
  return val instanceof $ArrayConstructor
}

/**
 * Run This Function in your main file ex. main.js, index.js, app.js etc
 */
function initTypes() {
  globalThis.$ = $
}

export default initTypes
