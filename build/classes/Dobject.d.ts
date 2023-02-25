declare abstract class DobjectConstructor<T> {
    /**
     * Similiar with JSON.stringify()
     */
    readonly $stringify: () => string;
    /**
     * Wheter or not object and this have the same properties
     */
    readonly $same: (object: any) => boolean;
    /**
     * Object's size/length
     */
    readonly $size: () => number;
    /**
     * Wheter or not the object is empty
     */
    readonly $empty: () => boolean;
    /**
     * Deeply clones object without references
     * primitive types, arrays, objects and Date
     * Functions with refs !
     */
    readonly $clone: () => Dobject<T>;
    /**
     * Clones with refs, faster
     */
    readonly $shallowClone: () => Dobject<T>;
    /**
     * Map method
     *
     * @example
     * $({price1: 10, price2: 20}).map((val, key) => val * 2) // {price1: 20, price2: 40}
     */
    readonly $map: (cb: (value: any, key: keyof T) => any) => Dobject<T>;
    /**
     * Filter method
     *
     * @example
     * $({price1: 10, price2: 20}).filter((val, key) => val > 15) // {price2: 20}
     */
    readonly $filter: (cb: (value: any, key: keyof T) => boolean) => Dobject<any>;
    /**
     * For Each method / Loop
     *
     * @example
     * $({price1: 10, price2: 20}).forEach((val, key) => console.log(key, value))
     */
    readonly $forEach: (cb: (value: any, key: keyof T) => any) => void;
    /**
     * Every Method
     *
     * @returns {boolean}
     *
     * @example
     * $({price1: 10, price2: 20}).every((val, key) => val > 15) // false
     */
    readonly $every: (cb: (value: any, key: keyof T) => any) => boolean;
    /**
     * Some Method
     *
     * @returns {boolean}
     *
     * @example
     * $({price1: 10, price2: 20}).some((val, key) => val > 15) // true
     */
    readonly $some: (cb: (value: any, key: keyof T) => any) => boolean;
    /**
     * Wheter or not object has a property with this key
     *
     * @returns {boolean}
     *
     * @example
     * $({price1: 10, price2: 20}).has("price1") // true
     */
    readonly $has: (key: any) => boolean;
    /**
     * Wheter or not object has some properties with these keys
     *
     * @returns {boolean}
     *
     * @example
     * $({price1: 10, price2: 20}).hasSome("price1", "price3") // true
     */
    readonly $hasSome: (...keys: any[]) => boolean;
    /**
     * Wheter or not object has all properties with these keys
     *
     * @returns {boolean}
     *
     * @example
     * $({price1: 10, price2: 20}).hasAll("price1", "price3") // false
     */
    readonly $hasAll: (...keys: any[]) => boolean;
    /**
     * Logs this object
     */
    readonly $log: () => void;
    constructor();
}
type Dobject<T = any> = T & DobjectConstructor<T>;
declare const Dobject: {
    new <T>(value?: any): {
        /**
         * Similiar with JSON.stringify()
         */
        readonly $stringify: () => string;
        /**
         * Wheter or not object and this have the same properties
         */
        readonly $same: (object: any) => boolean;
        /**
         * Object's size/length
         */
        readonly $size: () => number;
        /**
         * Wheter or not the object is empty
         */
        readonly $empty: () => boolean;
        /**
         * Deeply clones object without references
         * primitive types, arrays, objects and Date
         * Functions with refs !
         */
        readonly $clone: () => Dobject<T>;
        /**
         * Clones with refs, faster
         */
        readonly $shallowClone: () => Dobject<T>;
        /**
         * Map method
         *
         * @example
         * $({price1: 10, price2: 20}).map((val, key) => val * 2) // {price1: 20, price2: 40}
         */
        readonly $map: (cb: (value: any, key: keyof T) => any) => Dobject<T>;
        /**
         * Filter method
         *
         * @example
         * $({price1: 10, price2: 20}).filter((val, key) => val > 15) // {price2: 20}
         */
        readonly $filter: (cb: (value: any, key: keyof T) => boolean) => Dobject<any>;
        /**
         * For Each method / Loop
         *
         * @example
         * $({price1: 10, price2: 20}).forEach((val, key) => console.log(key, value))
         */
        readonly $forEach: (cb: (value: any, key: keyof T) => any) => void;
        /**
         * Every Method
         *
         * @returns {boolean}
         *
         * @example
         * $({price1: 10, price2: 20}).every((val, key) => val > 15) // false
         */
        readonly $every: (cb: (value: any, key: keyof T) => any) => boolean;
        /**
         * Some Method
         *
         * @returns {boolean}
         *
         * @example
         * $({price1: 10, price2: 20}).some((val, key) => val > 15) // true
         */
        readonly $some: (cb: (value: any, key: keyof T) => any) => boolean;
        /**
         * Wheter or not object has a property with this key
         *
         * @returns {boolean}
         *
         * @example
         * $({price1: 10, price2: 20}).has("price1") // true
         */
        readonly $has: (key: any) => boolean;
        /**
         * Wheter or not object has some properties with these keys
         *
         * @returns {boolean}
         *
         * @example
         * $({price1: 10, price2: 20}).hasSome("price1", "price3") // true
         */
        readonly $hasSome: (...keys: any[]) => boolean;
        /**
         * Wheter or not object has all properties with these keys
         *
         * @returns {boolean}
         *
         * @example
         * $({price1: 10, price2: 20}).hasAll("price1", "price3") // false
         */
        readonly $hasAll: (...keys: any[]) => boolean;
        /**
         * Logs this object
         */
        readonly $log: () => void;
    };
    isDobject(val: any): val is any;
    new<D extends unknown>(value: D): Dobject<D>;
};
export default Dobject;
