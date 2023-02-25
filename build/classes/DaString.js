"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DaStringConstructor extends String {
    static new(value) {
        return new DaStringConstructor(value);
    }
    static isDaString(val) {
        return val instanceof DaString;
    }
    constructor(value) {
        super(value);
    }
    /**
     * Wheter or not string is empty ""
     *
     * @returns {boolean}
     */
    empty() {
        return !!String(this).length;
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
    capitalize(splitRegexp = / +/g, joinRegexp = " ") {
        return DaString.new(String(this)
            .split(splitRegexp)
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join(joinRegexp));
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
    shorten(maxLength) {
        const text = String(this);
        return DaString.new(text.length > maxLength ? `${text.substring(0, maxLength - 3)}...` : text);
    }
    /**
     * Logs this string
     */
    log() {
        console.log(this.toString());
    }
}
const DaString = DaStringConstructor;
exports.default = DaString;
