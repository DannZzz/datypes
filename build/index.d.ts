import { AnyObject } from "./typing";
import _DaNumber from "./classes/DaNumber";
import _Darray from "./classes/Darray";
import _DaString from "./classes/DaString";
import _Dobject from "./classes/Dobject";
/**
 * Namespace with types
 */
export declare namespace $ {
    /**
     * Object type {}
     * @example
     * Dobject<{name: string; age: number}>
     */
    type Dobject<T> = _Dobject<T>;
    /**
     * Array type []
     * @example
     * Darray<number> === number[]
     */
    type Darray<T> = _Darray<T>;
    /**
     * Number type
     * default it's just a number
     * @example
     * DaNumber === any number
     * DaNumber<1 | 2> === only 1 or 2
     */
    type DaNumber<T extends number = number> = _DaNumber<T>;
    /**
     * String type
     * default it's just a string
     * @example
     * DaString === any string
     * DaNumber<"name" | "surname"> === only "name" or "surname"
     */
    type DaString<T extends string = string> = _DaString<T>;
}
type ParseArrayType<T> = T extends (infer R)[] ? R : T;
type GetType<T = any> = T extends number ? _DaNumber<T> : T extends string ? _DaString<T> : T extends any[] ? _Darray<ParseArrayType<T>> : T extends AnyObject ? _Dobject<T> : T;
/**
 * Define a value
 *
 * @example
 * const a = $() // undefined
 */
export declare function $(): undefined;
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
export declare function $(value: TemplateStringsArray): GetType<string[]>;
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
export declare function $<T>(value: T): GetType<T>;
export default $;
