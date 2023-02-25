type DaString<T extends string = string> = DaStringConstructor<T> & T;
declare class DaStringConstructor<T extends string> extends String {
    static new<T extends string>(value?: T): DaString<T>;
    static isDaString(val: any): val is DaString;
    private constructor();
    /**
     * Wheter or not string is empty ""
     *
     * @returns {boolean}
     */
    empty(): boolean;
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
    capitalize(splitRegexp?: any, joinRegexp?: any): DaString;
    /**
     * Cuts string and adds ...
     *
     * @param {number} maxLength max length of string
     * @returns {DaString}
     *
     * @example
     * $("I Love You").shorten(4) // I...
     */
    shorten(maxLength: number): DaString;
    /**
     * Logs this string
     */
    log(): void;
}
declare const DaString: typeof DaStringConstructor;
export default DaString;
