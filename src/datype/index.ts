import { AnyObject } from "./typing"
import $number from "./classes/$number"
import $Array from "./classes/$Array"
import $string from "./classes/$string"
import $object from "./classes/$object"

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
 * const name = $("Dann") // $string
 * const age = $(18) // $number
 * const hobbies = $(["havn't", "any"]) // $Array<string>
 * const phrases = $({
 * hello: "just hello buddy",
 * bye: "see you soon cutie"
 * }) // $object<{hello: string; bye: string}>
 */
export function $<T>(value: T): GetType<T>
export function $<T>(value?: T) {
  if (value == null || value == undefined) return undefined

  if (typeof value === "number") return $number.new(value)
  if (typeof value === "string") return $string.new(value)

  if (Array.isArray(value)) return $Array.new(...value)

  if (value instanceof Object) return $object.new(value)

  return value
}

export default $

$()
