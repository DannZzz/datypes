import { randomNumber } from "anytool"

type DaNumber<T extends number = number> = T & DaNumberConstructor<T>

class DaNumberConstructor<T extends number> extends Number {
  static new<T extends number>(value?: T): DaNumber<T> {
    return new DaNumber(value) as any
  }

  /**
   * Get random integer from range
   *
   * @param {number} min min of range
   * @param {number} max max of range
   * @returns {DaNumber}
   */
  static random(min: number, max: number): DaNumber {
    return DaNumber.new(randomNumber(min, max))
  }

  static isDaNumber(val: any): val is DaNumber {
    return val instanceof DaNumber
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
   * @returns {DaNumber}
   */
  round(): DaNumber {
    return DaNumber.new(Math.round(Number(this)))
  }

  /**
   * Similar with Math.ceil
   *
   * @returns {DaNumber}
   */
  ceil(): DaNumber {
    return DaNumber.new(Math.ceil(Number(this)))
  }

  /**
   * Similar with Math.floor
   *
   * @returns {DaNumber}
   */
  floor(): DaNumber {
    return DaNumber.new(Math.floor(Number(this)))
  }

  /**
   * Logs number
   */
  log(): void {
    console.log(Number(this))
  }
}

const DaNumber = DaNumberConstructor

export default DaNumber
