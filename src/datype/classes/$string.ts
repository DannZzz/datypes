export class $StringConstructor<T extends string> extends String {
  static new<T extends string>(value?: T): $string<T> {
    return new $StringConstructor(value) as any
  }

  static is$string(val: any): val is $string {
    return val instanceof $string
  }

  private constructor(value?: any) {
    super(value)
  }

  /**
   * Wheter or not string is empty ""
   *
   * @returns {boolean}
   */
  empty(): boolean {
    return !!String(this).length
  }

  /**
   * Capitalizes string by splitting
   *
   * @param splitRegexp pattern for splitting
   * @param joinRegexp pattern for joining
   * @returns {$string}
   *
   * @example
   * $("hello   guys").capitalize() // "Hello Guys"
   * $("yoo_dudes").capitalize("_", "   ") // "Yoo   Dudes"
   */
  capitalize(splitRegexp: any = / +/g, joinRegexp: any = " "): $string {
    return $string.new(
      String(this)
        .split(splitRegexp)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(joinRegexp)
    )
  }

  /**
   * Cuts string and adds ...
   *
   * @param {number} maxLength max length of string
   * @returns {$string}
   *
   * @example
   * $("I Love You").shorten(4) // I...
   */
  shorten(maxLength: number): $string {
    const text = String(this)
    return $string.new(
      text.length > maxLength ? `${text.substring(0, maxLength - 3)}...` : text
    )
  }

  /**
   * Logs this string
   */
  log(): void {
    console.log(this.toString())
  }
}

const $string = $StringConstructor

export default $string
