import { $Object } from "../classes/$object"
import { $ArrayConstructor } from "../classes/$Array"
import { $NumberConstructor } from "../classes/$number"
import { $StringConstructor } from "../classes/$string"

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
}

export {}
