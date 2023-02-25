import { AnyObject } from "./typing"
import _DaNumber from "./classes/DaNumber"
import _Darray from "./classes/Darray"
import _DaString from "./classes/DaString"
import _Dobject from "./classes/Dobject"

/**
 * Namespace with types
 */
export namespace $ {
  /**
   * Object type {}
   * @example
   * Dobject<{name: string; age: number}>
   */
  export type Dobject<T> = _Dobject<T>
  /**
   * Array type []
   * @example
   * Darray<number> === number[]
   */
  export type Darray<T> = _Darray<T>
  /**
   * Number type
   * default it's just a number
   * @example
   * DaNumber === any number
   * DaNumber<1 | 2> === only 1 or 2
   */
  export type DaNumber<T extends number = number> = _DaNumber<T>
  /**
   * String type
   * default it's just a string
   * @example
   * DaString === any string
   * DaNumber<"name" | "surname"> === only "name" or "surname"
   */
  export type DaString<T extends string = string> = _DaString<T>
}
type ParseArrayType<T> = T extends (infer R)[] ? R : T
type GetType<T = any> = T extends number
  ? _DaNumber<T>
  : T extends string
  ? _DaString<T>
  : T extends any[]
  ? _Darray<ParseArrayType<T>>
  : T extends AnyObject
  ? _Dobject<T>
  : T

/**
 * Define a value
 *
 * @example
 * const a = $() // undefined
 */
export function $(): undefined
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
export function $(value: TemplateStringsArray): GetType<string[]>
/**
 * Define a value
 *
 * @param {any} value
 *
 * @example
 * const name = $("Dann") // DaString
 * const age = $(18) // DaNumber
 * const hobbies = $(["havn't", "any"]) // Darray<string>
 * const phrases = $({
 * hello: "just hello buddy",
 * bye: "see you soon cutie"
 * }) // Dobject<{hello: string; bye: string}>
 */
export function $<T>(value: T): GetType<T>
export function $<T>(value?: T) {
  if (value == null || value == undefined) return undefined

  if (typeof value === "number") return _DaNumber.new(value)
  if (typeof value === "string") return _DaString.new(value)

  if (Array.isArray(value)) return _Darray.new(...value)

  if (value instanceof Object) return _Dobject.new(value)

  return value
}

export default $

$()
