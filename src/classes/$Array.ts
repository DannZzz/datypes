import { equal } from "anytool"

export class $ArrayConstructor<T> extends Array {
  static new<T>(...vals: T[]): $Array<T> {
    return new $ArrayConstructor(...vals) as any
  }

  static is$Array(val: any): val is $Array<any> {
    return val instanceof $Array
  }

  private constructor(...vals: any[]) {
    super(...vals)
  }

  /**
   * Shuffles and returns new $Array
   *
   * @returns {$Array<T>}
   */
  shuffle(): $Array<T> {
    const arr = this.slice(0)
    for (let i = arr.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return $ArrayConstructor.new(...arr)
  }

  /**
   * Wheter or not the array is empty
   *
   * @returns {boolean}
   */
  empty(): boolean {
    return !!this.length
  }

  /**
   * Shuffles current array
   */
  shuffleThis(): void {
    const arr = this
    for (let i = arr.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
  }

  /**
   * Wheter or not arrays are the same
   *
   * @link
   * https://github.com/DannZzz/anytool
   *
   * @param {any[]} array
   * @returns {boolean}
   */
  same(array: any[]): boolean {
    if (!array || !Array.isArray(array) || this.length !== array.length)
      return false
    return equal(this, array as any)
  }

  /**
   * Returns new readonly array (TS)
   *
   * @returns {ReadonlyArray<T>}
   */
  readonly(): ReadonlyArray<T> {
    return [...this] as const
  }

  /**
   * Removes duplicates
   *
   * @returns {$Array<T>}
   */
  unique(): $Array<T> {
    return $ArrayConstructor.new(...new Set(this))
  }

  /**
   * Removes element from array
   *
   * @param {number} index
   */
  remove(index: number): void
  /**
   * Removes element by specified indexes
   *
   * @param {...number[]} indexes
   */
  remove(...indexes: number[]): void
  remove(...indexes: number[]) {
    if (!indexes.length) return
    if (indexes.length === 1) {
      this.splice(indexes[0], 1)
    } else {
      const filtered = this.filter((_, i) => !indexes.includes(i))
      this.length = 0
      this.push(...filtered)
    }
  }

  /**
   * Wheter or not this array has all items in spec. array
   *
   * @param {...any[]} items
   * @returns {boolean}
   */
  includesAll(...items: any[]): boolean {
    return items.every((item) => this.includes(item))
  }

  /**
   * Wheter or not this array has any item in spec. array
   *
   * @param {...any[]} items
   * @returns {boolean}
   */
  includesAny(...items: any[]): boolean {
    return items.some((item) => this.includes(item))
  }

  /**
   * Easily do math operations
   *
   * @param {"+" | "-" | "*" | "/"} operator
   * @returns {$number}
   *
   * @example
   * $([10, 20]).compute("+") // 30
   */
  compute(operator: "+" | "-" | "/" | "*"): $number
  /**
   * Easily do math operations
   *
   * @param {"+" | "-" | "*" | "/"} operator
   * @param {(item: T) => number} useThisKey use This function if elements are nested objects or arrays
   * @returns {$number}
   *
   * @example
   * $([{age: 10}, {age: 30}]).compute("+", (i) => i.age) // 30
   */
  compute(
    operator: "+" | "-" | "/" | "*",
    useThisKey: (item: T) => number
  ): $number
  compute(
    operator: "+" | "-" | "/" | "*",
    useThisKey?: (item: T) => number
  ): $number {
    switch (operator) {
      case "*":
        return $(
          this.reduce(
            (aggr, item) =>
              aggr *
              (typeof useThisKey === "function" ? useThisKey(item) : item),
            1
          )
        )

      case "/":
        if (this.length <= 1)
          return $(
            typeof useThisKey === "function" ? useThisKey(this[0]) : this[0]
          )

        return $(
          this.slice(1).reduce(
            (aggr, item) =>
              aggr /
              ((typeof useThisKey === "function"
                ? useThisKey(item)
                : item) as any),
            typeof useThisKey === "function" ? useThisKey(this[0]) : this[0]
          )
        )

      case "-":
        if (this.length <= 1)
          return $(
            typeof useThisKey === "function" ? useThisKey(this[0]) : this[0]
          )

        return $(
          this.slice(1).reduce(
            (aggr, item) =>
              aggr -
              ((typeof useThisKey === "function"
                ? useThisKey(item)
                : item) as any),
            typeof useThisKey === "function" ? useThisKey(this[0]) : this[0]
          )
        )

      case "+":
        return $(
          this.reduce(
            (aggr, item) =>
              aggr +
              (typeof useThisKey === "function" ? useThisKey(item) : item),
            0
          )
        )

      default:
        return $(0)
    }
  }

  /**
   * Logs this array
   */
  log(): void {
    console.log([...this])
  }
}

const $Array = $ArrayConstructor

export default $Array
