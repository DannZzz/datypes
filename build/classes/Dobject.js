"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class DobjectConstructor {
    /**
     * Similiar with JSON.stringify()
     */
    $stringify;
    /**
     * Wheter or not object and this have the same properties
     */
    $same;
    /**
     * Object's size/length
     */
    $size;
    /**
     * Wheter or not the object is empty
     */
    $empty;
    /**
     * Deeply clones object without references
     * primitive types, arrays, objects and Date
     * Functions with refs !
     */
    $clone;
    /**
     * Clones with refs, faster
     */
    $shallowClone;
    /**
     * Map method
     *
     * @example
     * $({price1: 10, price2: 20}).map((val, key) => val * 2) // {price1: 20, price2: 40}
     */
    $map;
    /**
     * Filter method
     *
     * @example
     * $({price1: 10, price2: 20}).filter((val, key) => val > 15) // {price2: 20}
     */
    $filter;
    /**
     * For Each method / Loop
     *
     * @example
     * $({price1: 10, price2: 20}).forEach((val, key) => console.log(key, value))
     */
    $forEach;
    /**
     * Every Method
     *
     * @returns {boolean}
     *
     * @example
     * $({price1: 10, price2: 20}).every((val, key) => val > 15) // false
     */
    $every;
    /**
     * Some Method
     *
     * @returns {boolean}
     *
     * @example
     * $({price1: 10, price2: 20}).some((val, key) => val > 15) // true
     */
    $some;
    /**
     * Wheter or not object has a property with this key
     *
     * @returns {boolean}
     *
     * @example
     * $({price1: 10, price2: 20}).has("price1") // true
     */
    $has;
    /**
     * Wheter or not object has some properties with these keys
     *
     * @returns {boolean}
     *
     * @example
     * $({price1: 10, price2: 20}).hasSome("price1", "price3") // true
     */
    $hasSome;
    /**
     * Wheter or not object has all properties with these keys
     *
     * @returns {boolean}
     *
     * @example
     * $({price1: 10, price2: 20}).hasAll("price1", "price3") // false
     */
    $hasAll;
    /**
     * Logs this object
     */
    $log;
    constructor() {
        Object.defineProperties(this, {
            $log: {
                enumerable: false,
                writable: false,
                value: () => {
                    console.log(this);
                },
            },
            $hasAll: {
                enumerable: false,
                writable: false,
                value: (...keys) => {
                    return keys.every((key) => key in this && this.propertyIsEnumerable(key));
                },
            },
            $hasSome: {
                enumerable: false,
                writable: false,
                value: (...keys) => {
                    return keys.some((key) => key in this && this.propertyIsEnumerable(key));
                },
            },
            $has: {
                enumerable: false,
                writable: false,
                value: (key) => {
                    return key in this && this.propertyIsEnumerable(key);
                },
            },
            $some: {
                enumerable: false,
                writable: false,
                value: (cb) => {
                    for (let k in this) {
                        if (cb(this[k], k))
                            return true;
                    }
                    return false;
                },
            },
            $every: {
                enumerable: false,
                writable: false,
                value: (cb) => {
                    for (let k in this) {
                        if (!cb(this[k], k))
                            return false;
                    }
                    return true;
                },
            },
            $stringify: {
                enumerable: false,
                writable: false,
                value: () => {
                    return JSON.stringify(this);
                },
            },
            $size: {
                enumerable: false,
                writable: false,
                value: () => {
                    return Object.keys(this).length;
                },
            },
            $empty: {
                enumerable: false,
                writable: false,
                value: () => {
                    return Object.keys(this).length === 0;
                },
            },
            $same: {
                enumerable: false,
                writable: false,
                value: (object) => {
                    if (!object)
                        return false;
                    if (!(object instanceof Object))
                        return false;
                    if (this.$size() !== Object.keys(object).length)
                        return false;
                    for (let k in object) {
                        if (object[k] !== this[k])
                            return false;
                    }
                    return true;
                },
            },
            $clone: {
                enumerable: false,
                writable: false,
                value: () => {
                    return Dobject.new((0, utils_1._clone)(this));
                },
            },
            $shallowClone: {
                enumerable: false,
                writable: false,
                value: () => {
                    return Dobject.new(Object.assign({}, this));
                },
            },
            $map: {
                enumerable: false,
                writable: false,
                value: (cb) => {
                    const obj = {};
                    for (let k in this) {
                        obj[k] = cb(this[k], k);
                    }
                    return Dobject.new(obj);
                },
            },
            $filter: {
                enumerable: false,
                writable: false,
                value: (cb) => {
                    const obj = {};
                    for (let k in this) {
                        if (!!cb(this[k], k))
                            obj[k] = this[k];
                    }
                    return Dobject.new(obj);
                },
            },
            $forEach: {
                enumerable: false,
                writable: false,
                value: (cb) => {
                    const obj = {};
                    for (let k in this) {
                        cb(this[k], k);
                    }
                },
            },
        });
    }
}
const Dobject = class extends DobjectConstructor {
    constructor(value) {
        super();
        if (value instanceof Object) {
            for (let k in value) {
                if (!Object.hasOwn(this, k)) {
                    this[k] = value[k];
                }
            }
        }
    }
    static isDobject(val) {
        return val instanceof Dobject;
    }
    static new(value) {
        return new Dobject(value);
    }
};
exports.default = Dobject;
