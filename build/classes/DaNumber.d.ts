type DaNumber<T extends number = number> = T & DaNumberConstructor<T>;
declare class DaNumberConstructor<T extends number> extends Number {
    static new<T extends number>(value?: T): DaNumber<T>;
    /**
     * Get random integer from range
     *
     * @param {number} min min of range
     * @param {number} max max of range
     * @returns {DaNumber}
     */
    static random(min: number, max: number): DaNumber;
    static isDaNumber(val: any): val is DaNumber;
    private constructor();
    /**
     * Formats number with locale en-us
     */
    format(): string;
    /**
     * Formats number with locale
     *
     * @param {string} locale  any locale
     *
     * @example
     * $(123456789).format("ru-ru") // 123 456,789
     * $(123456789).format("ar-EG") // ١٢٣٤٥٦٫٧٨٩
     */
    format(locale: string): string;
    /**
     * Wheter or not number is even
     *
     * @returns {boolean}
     */
    even(): boolean;
    /**
     * Wheter or not number is odd
     *
     * @returns {boolean}
     */
    odd(): boolean;
    /**
     * Similar with Math.round
     *
     * @returns {DaNumber}
     */
    round(): DaNumber;
    /**
     * Similar with Math.ceil
     *
     * @returns {DaNumber}
     */
    ceil(): DaNumber;
    /**
     * Similar with Math.floor
     *
     * @returns {DaNumber}
     */
    floor(): DaNumber;
    /**
     * Logs number
     */
    log(): void;
}
declare const DaNumber: typeof DaNumberConstructor;
export default DaNumber;
