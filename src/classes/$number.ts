import { randomNumber } from "anytool"

export class $NumberConstructor<T extends number> extends Number {
  static new<T extends number>(value?: T): $number<T> {
    return new $number(value) as any
  }

  /**
   * Get random integer from range
   *
   * @param {number} min min of range
   * @param {number} max max of range
   * @returns {$number}
   */
  static random(min: number, max: number): $number {
    return $number.new(randomNumber(min, max))
  }

  static is$number(val: any): val is $number {
    return val instanceof $number
  }

  private constructor(value?: any) {
    super(value)
  }

  /**
   * Formats number with locale en-us
   */
  format(): string
  /**
   * Formats number with locale
   *
   * @param {string} locale  any locale
   *
   * @example
   * $(123456789).format("ru-ru") // 123 456,789
   * $(123456789).format("ar-EG") // ١٢٣٤٥٦٫٧٨٩
   */
  format(locale: string): string
  format(locale: string = "en-us") {
    return Number.parseFloat(this.toString()).toLocaleString(locale)
  }

  /**
   * Wheter or not number is even
   *
   * @returns {boolean}
   */
  even(): boolean {
    return Number(this) % 2 === 1
  }

  /**
   * Wheter or not number is odd
   *
   * @returns {boolean}
   */
  odd(): boolean {
    return Number(this) % 2 === 0
  }

  /**
   * Similar with Math.round
   *
   * @returns {$number}
   */
  round(): $number {
    return $number.new(Math.round(Number(this)))
  }

  /**
   * Similar with Math.ceil
   *
   * @returns {$number}
   */
  ceil(): $number {
    return $number.new(Math.ceil(Number(this)))
  }

  /**
   * Similar with Math.floor
   *
   * @returns {$number}
   */
  floor(): $number {
    return $number.new(Math.floor(Number(this)))
  }

  /**
   * Logs number
   */
  log(): void {
    console.log(Number(this))
  }
}

const $number = $NumberConstructor

export default $number
