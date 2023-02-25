type Darray<T> = Array<T> & DarrayConstructor<T>;
declare class DarrayConstructor<T> extends Array {
    static new<T>(...vals: T[]): Darray<T>;
    static isDarray(val: any): val is Darray<any>;
    private constructor();
    /**
     * Shuffles and returns new Darray
     *
     * @returns {Darray<T>}
     */
    shuffle(): Darray<T>;
    /**
     * Wheter or not the array is empty
     *
     * @returns {boolean}
     */
    empty(): boolean;
    /**
     * Shuffles current array
     */
    shuffleThis(): void;
    /**
     * Wheter or not arrays are the same
     *
     * @link
     * https://github.com/DannZzz/anytool
     *
     * @param {any[]} array
     * @returns {boolean}
     */
    same(array: any[]): boolean;
    /**
     * Returns new readonly array (TS)
     *
     * @returns {ReadonlyArray<T>}
     */
    readonly(): ReadonlyArray<T>;
    /**
     * Removes duplicates
     *
     * @returns {Darray<T>}
     */
    unique(): Darray<T>;
    /**
     * Removes element from array
     *
     * @param {number} index
     */
    remove(index: number): void;
    /**
     * Removes element by specified indexes
     *
     * @param {...number[]} indexes
     */
    remove(...indexes: number[]): void;
    /**
     * Logs this array
     */
    log(): void;
}
declare const Darray: typeof DarrayConstructor;
export default Darray;
