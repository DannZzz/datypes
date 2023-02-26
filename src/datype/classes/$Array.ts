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
    return equal(this, array)
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
   * Logs this array
   */
  log(): void {
    console.log([...this])
  }
}

const $Array = $ArrayConstructor

export default $Array
