import { AnyObject } from "./type"
import $number, { $NumberConstructor } from "./classes/$number"
import $Array, { $ArrayConstructor } from "./classes/$Array"
import $string, { $StringConstructor } from "./classes/$string"
import $object, { $Object } from "./classes/$object"

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
  type $string<T extends string = string> = $StringConstructor<T> & T

  /**
   * Define a value
   *
   * @example
   * const a = $() // undefined
   */
  function $(): undefined
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

function $<T>(value?: T) {
  if (value == null || value == undefined) return undefined

  if (typeof value === "number") return $number.new(value)
  if (typeof value === "string") return $string.new(value)

  if (Array.isArray(value)) return $Array.new(...value)

  if (value instanceof Object) return $object.new(value)

  return value
}

/**
 * Run This Function in your main file ex. main.js, index.js, app.js etc
 */
function initTypes() {
  globalThis.$ = $
}

export default initTypes
