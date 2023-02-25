type DaString<T extends string = string> = DaStringConstructor<T> & T

class DaStringConstructor<T extends string> extends String {
  static new<T extends string>(value?: T): DaString<T> {
    return new DaStringConstructor(value) as any
  }

  static isDaString(val: any): val is DaString {
    return val instanceof DaString
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
   * @returns {DaString}
   *
   * @example
   * $("hello   guys").capitalize() // "Hello Guys"
   * $("yoo_dudes").capitalize("_", "   ") // "Yoo   Dudes"
   */
  capitalize(splitRegexp: any = / +/g, joinRegexp: any = " "): DaString {
    return DaString.new(
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
   * @returns {DaString}
   *
   * @example
   * $("I Love You").shorten(4) // I...
   */
  shorten(maxLength: number): DaString {
    const text = String(this)
    return DaString.new(
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

const DaString = DaStringConstructor

export default DaString
